import React, { useEffect, useRef, useState } from "react";
import Faq from "react-faq-component";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';


const FAQ = () => {
    const data = {
        title: "Frequently Asked Questions",
        rows: [
            {
                title: "How many Fancy Foxes will be available to be tamed?",
                content: `9189 Fancy Foxes will be minted for the public. It’s only batch 1, we are planning to make this a long run project, and benefits our holders more and more.`,
            },
            {
                title: "What Blockchain will the Fancy Foxes be minted on?",
                content:
                    "The Solana Blockchain.",
            },
            {
                title: "When are we able to tame our Fancy Foxes?",
                content: `We are able to tame our Fancy Foxes at June 1st, 2022. Time will be announced in our Discord
                `,
            },
            {
                title: "Where can I view my NFT?",
                content:
                    "Once minted, you can view it in your wallet and you’ll just need to login into your account in Solsea, Solanart or MagicEden to view your NFT.",
            },
            {
                title: "Will there be a pre-sale?",
                content:
                    "Yes, there will be presale for whitelisted members. This will take place a few days before the public mint.",
            },
            {
                title: "How can we tame our Fancy Foxes?",
                content:
                    <p>Firstly, you can tame your Fancy Foxes at our website and you will need a wallet that is compatible with the Solana Blockchain, such as; Phantom Wallet, Solflare, Sollet, Coin98 and many more. For tutorials, we will post it in our <a className="text-orange-600 underline" href="https://discord.gg/dp35RvcscG">DISCORD</a></p>,
            },
        ],
        styles: {
            titleTextColor: 'orange',
            titleTextSize: '40px',
            rowTitleColor: 'white',
            bgColor: 'transparent',
            rowTitleTextSize: '25px',
            rowContentColor: 'white',
            rowContentTextSize: '15px',
            // rowContentPaddingTop: '10px',
            rowContentPaddingBottom: '10px',
            // rowContentPaddingLeft: '40px',
            rowContentPaddingRight: '100px',
            arrowColor: "orange",
            transitionDuration: "0.5s",
            timingFunc: "ease-in-out",
            // bgColor: "rgba(0,0,0,0.5)",
        }
    };

    const config = {
        animate: true,
        arrowIcon: <KeyboardArrowDownIcon />,
        // tabFocus: true
    };

    return (
        <div className="relative inline-block px-10 mb-10 w-[100%] flex justify-center">
            <div id="faq" className="h-[550px] mb-10 px-10 flex items-center text-[10px]">
                <Faq data={data} config={config} styles={data.styles} />
            </div>
        </div>
    );
}

export default FAQ;