use anchor_lang::prelude::*;
use anchor_spl::token::{self};

use spl_associated_token_account::{
    create_associated_token_account,
    get_associated_token_address,
};

use metaplex_token_metadata::{
    instruction::{
        create_metadata_accounts,
        create_master_edition,
    },
    utils::{
        create_or_allocate_account_raw,
        puffed_out_string,
    },
};

use solana_program::{
    program::{invoke_signed},
};

pub mod merkle_proof;

declare_id!("9R4RuSGk3raAVf6TJ7o1ixywcDW89p1MSo2ns9LEBXNK");

pub const PREFIX: &[u8] = b"collectoooooors";
pub const MAX_URI_LENGTH : usize = 200; // smaller?

#[program]
pub mod collectoooooors {
    use super::*;

    pub fn create_recipes(
        ctx: Context<CreateRecipe>,
        ingredients: String,
        roots: Vec<[u8; 32]>,
    ) -> ProgramResult {
        let recipe = &mut ctx.accounts.recipe;

        recipe.authority = *ctx.accounts.authority.key;
        recipe.ingredients = puffed_out_string(&ingredients, MAX_URI_LENGTH);
        recipe.roots = roots;

        Ok(())
    }

    pub fn start_dish(
        ctx: Context<StartDish>,
    ) -> ProgramResult {
        let dish = &mut ctx.accounts.dish;

        dish.authority = *ctx.accounts.payer.key;
        dish.recipe = ctx.accounts.recipe.key();
        dish.ingredients_added = 0;

        Ok(())
    }

    pub fn add_ingredient(
        ctx: Context<AddIngredient>,
        ingredient_bump: u8,
        ingredient_num: u64,
        proof: Vec<[u8; 32]>,
    ) -> ProgramResult {
        let recipe = &ctx.accounts.recipe;

        require!(
            ctx.accounts.from.mint
            == ctx.accounts.ingredient_mint.to_account_info().key(),
            ErrorCode::InvalidMint,
        );

        let node = solana_program::keccak::hashv(&[
            &[0x00],
            &ctx.accounts.ingredient_mint.key().to_bytes(),
        ]);

        require!(
            merkle_proof::verify(proof, recipe.roots[ingredient_num as usize], node.0),
            ErrorCode::InvalidProof,
        );

        let dish_key = ctx.accounts.dish.key();
        let ingredient_bytes = ingredient_num.to_le_bytes();
        let ingredient_store_seeds = [
            PREFIX,
            dish_key.as_ref(),
            &ingredient_bytes,
            &[ingredient_bump],
        ];

        require!(
            Pubkey::create_program_address(
                &ingredient_store_seeds,
                &ID,
            )
            == Ok(ctx.accounts.ingredient_store.key()),
            ErrorCode::InvalidMintPDA,
        );

        create_or_allocate_account_raw(
            ID,
            &ctx.accounts.ingredient_store.to_account_info(),
            &ctx.accounts.rent.to_account_info(),
            &ctx.accounts.system_program.to_account_info(),
            &ctx.accounts.payer.to_account_info(),
            token::TokenAccount::LEN,
            &ingredient_store_seeds,
        )?;

        token::initialize_account(
            CpiContext::new(
                ctx.accounts.token_program.to_account_info(),
                token::InitializeAccount {
                    account: ctx.accounts.ingredient_store.to_account_info(),
                    mint: ctx.accounts.ingredient_mint.to_account_info(),
                    authority: ctx.accounts.ingredient_store.to_account_info(),
                    rent: ctx.accounts.rent.to_account_info(),
                },
            ),
        )?;

        // we can't burn while we don't know if the dish can be completed...
        token::transfer(
            CpiContext::new(
                ctx.accounts.token_program.to_account_info(),
                token::Transfer {
                    from: ctx.accounts.from.to_account_info(),
                    to: ctx.accounts.ingredient_store.to_account_info(),
                    authority: ctx.accounts.payer.to_account_info(),
                },
            ),
            1,
        )?;

        let dish = &mut ctx.accounts.dish;

        dish.ingredients_added += 1;

        Ok(())
    }

    pub fn remove_ingredient(
        ctx: Context<RemoveIngredient>,
        ingredient_bump: u8,
        ingredient_num: u64,
    ) -> ProgramResult {
        require!(
            !ctx.accounts.dish.completed,
            ErrorCode::RecipeAlreadyCompleted,
        );

        require!(
            ctx.accounts.dish.authority
            == ctx.accounts.payer.key(),
            ErrorCode::InvalidAuthority,
        );

        let dish_key = ctx.accounts.dish.key();
        let ingredient_bytes = ingredient_num.to_le_bytes();
        let ingredient_store_seeds = [
            PREFIX,
            dish_key.as_ref(),
            &ingredient_bytes,
            &[ingredient_bump],
        ];

        require!(
            Pubkey::create_program_address(
                &ingredient_store_seeds,
                &ID,
            )
            == Ok(ctx.accounts.ingredient_store.key()),
            ErrorCode::InvalidMintPDA,
        );

        // we can't burn while we don't know if the dish can be completed...
        token::transfer(
            CpiContext::new(
                ctx.accounts.token_program.to_account_info(),
                token::Transfer {
                    from: ctx.accounts.ingredient_store.to_account_info(),
                    to: ctx.accounts.to.to_account_info(),
                    authority: ctx.accounts.payer.to_account_info(),
                },
            )
            .with_signer(&[&ingredient_store_seeds]),
            1,
        )?;

        let dish = &mut ctx.accounts.dish;

        dish.ingredients_added += 1;

        Ok(())
    }

    pub fn make_dish(
        ctx: Context<MakeDish>,
        recipe_master_mint_bump: u8,
        edition: u64,
    ) -> ProgramResult {

        require!(
            ctx.accounts.dish.recipe
            == ctx.accounts.recipe.key(),
            ErrorCode::MismatchedRecipe,
        );

        require!(
            ctx.accounts.dish.ingredients_added
            == ctx.accounts.recipe.roots.len() as u64,
            ErrorCode::IncompleteRecipe,
        );

        require!(
            !ctx.accounts.dish.completed,
            ErrorCode::RecipeAlreadyCompleted,
        );

        let recipe_key = ctx.accounts.recipe.key();
        let master_mint_key = ctx.accounts.metadata_master_mint.key();
        let recipe_master_mint_seeds = [
            PREFIX,
            recipe_key.as_ref(),
            master_mint_key.as_ref(),
            &[recipe_master_mint_bump],
        ];

        let metadata_infos = [
            ctx.accounts.token_metadata_program.clone(),
            ctx.accounts.metadata_new_metadata.clone(),
            ctx.accounts.metadata_new_edition.clone(),
            ctx.accounts.metadata_master_edition.clone(),
            ctx.accounts.metadata_new_mint.clone(),
            ctx.accounts.metadata_edition_mark_pda.clone(),
            ctx.accounts.metadata_new_mint_authority.to_account_info().clone(),
            ctx.accounts.payer.to_account_info().clone(),
            ctx.accounts.metadata_master_token_owner.to_account_info().clone(),
            ctx.accounts.metadata_master_token_account.clone(),
            ctx.accounts.metadata_new_update_authority.clone(),
            ctx.accounts.metadata_master_metadata.clone(),
            ctx.accounts.metadata_master_mint.clone(),
            ctx.accounts.rent.to_account_info().clone(),
        ];

        invoke_signed(
            &metaplex_token_metadata::instruction::mint_new_edition_from_master_edition_via_token(
                *ctx.accounts.token_metadata_program.key,
                *ctx.accounts.metadata_new_metadata.key,
                *ctx.accounts.metadata_new_edition.key,
                *ctx.accounts.metadata_master_edition.key,
                *ctx.accounts.metadata_new_mint.key,
                *ctx.accounts.metadata_new_mint_authority.key,
                *ctx.accounts.payer.key,
                *ctx.accounts.metadata_master_token_owner.key,
                *ctx.accounts.metadata_master_token_account.key,
                *ctx.accounts.metadata_new_update_authority.key,
                *ctx.accounts.metadata_master_metadata.key,
                *ctx.accounts.metadata_master_mint.key,
                edition,
            ),
            &metadata_infos,
            &[&recipe_master_mint_seeds],
        )?;

        // could set ingredients_added to 0?
        let dish = &mut ctx.accounts.dish;

        dish.completed = true;

        Ok(())
    }
}

#[derive(Accounts)]
#[instruction(ingredients: String, roots: Vec<[u8; 32]>)]
pub struct CreateRecipe<'info> {
    #[account(
        init,
        payer = payer,
        space =
          8                         // discriminator
        + 32                        // Pubkey
        + 4 + MAX_URI_LENGTH        // String
        + 4 + roots.len() * 32      // Vec
    )]
    pub recipe: Account<'info, Recipe>,

    pub authority: AccountInfo<'info>,

    #[account(mut)]
    pub payer: Signer<'info>,

    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct StartDish<'info> {
    pub recipe: Account<'info, Recipe>,

    #[account(
        init,
        payer = payer,
    )]
    pub dish: Account<'info, Dish>,

    #[account(mut)]
    pub payer: Signer<'info>,

    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
#[instruction(ingredient_bump: u8, ingredient_num: u64)]
pub struct AddIngredient<'info> {
    pub recipe: Account<'info, Recipe>,

    #[account(mut)]
    pub dish: Account<'info, Dish>,

    pub ingredient_mint: Account<'info, token::Mint>,

    #[account(mut)]
    pub ingredient_store: AccountInfo<'info>,

    #[account(mut)]
    pub payer: Signer<'info>,

    #[account(mut)]
    pub from: Account<'info, token::TokenAccount>,

    pub system_program: Program<'info, System>,

    pub token_program: Program<'info, token::Token>,

    pub rent: Sysvar<'info, Rent>,
}

#[derive(Accounts)]
#[instruction(ingredient_bump: u8, ingredient_num: u64)]
pub struct RemoveIngredient<'info> {
    #[account(mut)]
    pub dish: Account<'info, Dish>,

    pub ingredient_mint: Account<'info, token::Mint>,

    #[account(mut)]
    pub ingredient_store: AccountInfo<'info>,

    #[account(mut)]
    pub payer: Signer<'info>,

    #[account(mut)]
    pub to: Account<'info, token::TokenAccount>,

    pub system_program: Program<'info, System>,

    pub token_program: Program<'info, token::Token>,

    pub rent: Sysvar<'info, Rent>,
}

#[derive(Accounts)]
pub struct MakeDish<'info> {
    pub recipe: Account<'info, Recipe>,

    #[account(mut)]
    pub dish: Account<'info, Dish>,

    #[account(mut)]
    pub payer: Signer<'info>,

    #[account(mut)]
    pub metadata_new_metadata: AccountInfo<'info>,

    #[account(mut)]
    pub metadata_new_edition: AccountInfo<'info>,

    #[account(mut)]
    pub metadata_master_edition: AccountInfo<'info>,

    #[account(mut)]
    pub metadata_new_mint: AccountInfo<'info>,

    #[account(mut)]
    pub metadata_edition_mark_pda: AccountInfo<'info>,

    pub metadata_new_mint_authority: Signer<'info>,

    // PDA of recipe and master mint
    pub metadata_master_token_owner: AccountInfo<'info>,

    pub metadata_master_token_account: AccountInfo<'info>,

    pub metadata_new_update_authority: AccountInfo<'info>,

    pub metadata_master_metadata: AccountInfo<'info>,

    pub metadata_master_mint: AccountInfo<'info>,

    pub system_program: Program<'info, System>,

    pub token_program: Program<'info, token::Token>,

    pub token_metadata_program: AccountInfo<'info>,

    pub rent: Sysvar<'info, Rent>,
}

#[account]
#[derive(Default)]
pub struct Recipe {
    pub authority: Pubkey,
    pub ingredients: String,
    pub roots: Vec<[u8; 32]>,
}

#[account]
#[derive(Default)]
pub struct Dish {
    pub authority: Pubkey,
    pub recipe: Pubkey,
    pub ingredients_added: u64,
    pub completed: bool,
}

#[error]
pub enum ErrorCode {
    #[msg("Invalid Merkle proof")]
    InvalidProof,
    #[msg("Invalid Mint")]
    InvalidMint,
    #[msg("Invalid Mint PDA")]
    InvalidMintPDA,
    #[msg("Mismatched Recipe")]
    MismatchedRecipe,
    #[msg("Incomplete Recipe")]
    IncompleteRecipe,
    #[msg("Recipe Already Created")]
    RecipeAlreadyCompleted,
    #[msg("Invalid Authority")]
    InvalidAuthority,
}

