import React from 'react';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import CardMembershipIcon from '@mui/icons-material/CardMembership';
import { MintButton } from '../MintButton';
import { useEffect, useState } from 'react';
import { Container, Snackbar } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const Hero = ({ candyMachine, isUserMinting, setIsUserMinting, onMint, isActive, isPresale, isWhitelistUser, MintContainer, wallet, GatewayProvider, PublicKey, CANDY_MACHINE_PROGRAM, rpcUrl, setAlertState, sendTransaction, props, ConnectButton, Grid, itemsRemaining, discountPrice, formatNumber, endDate, MintCountdown, getCountdownDate, toggleMintButton}) => {

    const [mintTime, setMintTime] = useState(false)
    const [days, setDays] = useState(0)
    const [hours, setHours] = useState(0)
    const [minutes, setMinutes] = useState(0)
    const [seconds, setSeconds] = useState(0)


    useEffect(() => {

        const target = new Date("5/31/2022 00:00:00")

        const interval = setInterval(() => {
            const now = new Date()
            const difference = target.getTime() - now.getTime()

            const d = Math.floor(difference / (1000 * 60 * 60 * 24))
            setDays(d)
            const h = Math.floor(
                (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
            );
            setHours(h)
            const m = Math.floor(
                (difference % (1000 * 60 * 60)) / (1000 * 60)
            );
            setMinutes(m)
            const s = Math.floor(
                (difference % (1000 * 60)) / 1000);
            setSeconds(s)

            if (d <= 0 && h <= 0 && m <= 0 && s <= m) {
                setMintTime(true)
            }

        }, 1000)
        return () => clearInterval(interval)
    }, [])
    return (
        <>
            <div className="mx-12 md:h-[600px] h-[280px]">
                {/* Connect wallet button */}
                <div className="mr-1 flex justify-end absolute right-10 top-[125px]">
                    <Container maxWidth="xs" style={{ position: 'relative' }}>
                        <Paper
                            style={{
                                padding: 24,
                                paddingBottom: 10,
                                backgroundColor: '#151A1F',
                                borderRadius: 6,
                            }}
                        >
                            {!wallet.connected ? (
                                <ConnectButton>Connect Wallet</ConnectButton>
                            ) : (
                                <>
                                    {candyMachine && (
                                        <Grid
                                            container
                                            direction="row"
                                            justifyContent="center"
                                            wrap="nowrap"
                                        >
                                            <Grid item xs={3}>
                                                <Typography variant="body2" color="textSecondary">
                                                    Remaining
                                                </Typography>
                                                <Typography
                                                    variant="h6"
                                                    color="textPrimary"
                                                    style={{
                                                        fontWeight: 'bold',
                                                    }}
                                                >
                                                    {`${itemsRemaining}`}
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={4}>
                                                <Typography variant="body2" color="textSecondary">
                                                    {isWhitelistUser && discountPrice
                                                        ? 'Discount Price'
                                                        : 'Price'}
                                                </Typography>
                                                <Typography
                                                    variant="h6"
                                                    color="textPrimary"
                                                    style={{ fontWeight: 'bold' }}
                                                >
                                                    {isWhitelistUser && discountPrice
                                                        ? `◎ ${formatNumber.asNumber(discountPrice)}`
                                                        : `◎ ${formatNumber.asNumber(
                                                            candyMachine.state.price,
                                                        )}`}
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={5}>
                                                {isActive && endDate && Date.now() < endDate.getTime() ? (
                                                    <>
                                                        <MintCountdown
                                                            key="endSettings"
                                                            date={getCountdownDate(candyMachine)}
                                                            style={{ justifyContent: 'flex-end' }}
                                                            status="COMPLETED"
                                                            onComplete={toggleMintButton}
                                                        />
                                                        <Typography
                                                            variant="caption"
                                                            align="center"
                                                            display="block"
                                                            style={{ fontWeight: 'bold' }}
                                                        >
                                                            TO END OF MINT
                                                        </Typography>
                                                    </>
                                                ) : (
                                                    <>
                                                        <MintCountdown
                                                            key="goLive"
                                                            date={getCountdownDate(candyMachine)}
                                                            style={{ justifyContent: 'flex-end' }}
                                                            status={
                                                                candyMachine?.state?.isSoldOut ||
                                                                    (endDate && Date.now() > endDate.getTime())
                                                                    ? 'COMPLETED'
                                                                    : isPresale
                                                                        ? 'PRESALE'
                                                                        : 'LIVE'
                                                            }
                                                            onComplete={toggleMintButton}
                                                        />
                                                        {isPresale &&
                                                            candyMachine.state.goLiveDate &&
                                                            candyMachine.state.goLiveDate.toNumber() >
                                                            new Date().getTime() / 1000 && (
                                                                <Typography
                                                                    variant="caption"
                                                                    align="center"
                                                                    display="block"
                                                                    style={{ fontWeight: 'bold' }}
                                                                >
                                                                    UNTIL PUBLIC MINT
                                                                </Typography>
                                                            )}
                                                    </>
                                                )}
                                            </Grid>
                                        </Grid>
                                    )}
                                    <MintContainer>
                                        {candyMachine?.state.isActive &&
                                            candyMachine?.state.gatekeeper &&
                                            wallet.publicKey &&
                                            wallet.signTransaction ? (
                                            <GatewayProvider
                                                wallet={{
                                                    publicKey:
                                                        wallet.publicKey ||
                                                        new PublicKey(CANDY_MACHINE_PROGRAM),
                                                    //@ts-ignore
                                                    signTransaction: wallet.signTransaction,
                                                }}
                                                gatekeeperNetwork={
                                                    candyMachine?.state?.gatekeeper?.gatekeeperNetwork
                                                }
                                                clusterUrl={rpcUrl}
                                                handleTransaction={async (transaction) => {
                                                    setIsUserMinting(true);
                                                    const userMustSign = transaction.signatures.find(sig =>
                                                        sig.publicKey.equals(wallet.publicKey),
                                                    );
                                                    if (userMustSign) {
                                                        setAlertState({
                                                            open: true,
                                                            message: 'Please sign one-time Civic Pass issuance',
                                                            severity: 'info',
                                                        });
                                                        try {
                                                            transaction = await wallet.signTransaction(
                                                                transaction,
                                                            );
                                                        } catch (e) {
                                                            setAlertState({
                                                                open: true,
                                                                message: 'User cancelled signing',
                                                                severity: 'error',
                                                            });
                                                            // setTimeout(() => window.location.reload(), 2000);
                                                            setIsUserMinting(false);
                                                            throw e;
                                                        }
                                                    } else {
                                                        setAlertState({
                                                            open: true,
                                                            message: 'Refreshing Civic Pass',
                                                            severity: 'info',
                                                        });
                                                    }
                                                    try {
                                                        await sendTransaction(
                                                            props.connection,
                                                            wallet,
                                                            transaction,
                                                            [],
                                                            true,
                                                            'confirmed',
                                                        );
                                                        setAlertState({
                                                            open: true,
                                                            message: 'Please sign minting',
                                                            severity: 'info',
                                                        });
                                                    } catch (e) {
                                                        setAlertState({
                                                            open: true,
                                                            message:
                                                                'Solana dropped the transaction, please try again',
                                                            severity: 'warning',
                                                        });
                                                        console.error(e);
                                                        // setTimeout(() => window.location.reload(), 2000);
                                                        setIsUserMinting(false);
                                                        throw e;
                                                    }
                                                    await onMint();
                                                }}
                                                broadcastTransaction={false}
                                                options={{ autoShowModal: false }}
                                            >
                                                <MintButton
                                                    candyMachine={candyMachine}
                                                    isMinting={isUserMinting}
                                                    setIsMinting={val => setIsUserMinting(val)}
                                                    onMint={onMint}
                                                    isActive={isActive || (isPresale && isWhitelistUser)}
                                                />
                                            </GatewayProvider>
                                        ) : (
                                            <MintButton
                                                candyMachine={candyMachine}
                                                isMinting={isUserMinting}
                                                setIsMinting={val => setIsUserMinting(val)}
                                                onMint={onMint}
                                                isActive={isActive || (isPresale && isWhitelistUser)}
                                            />
                                        )}
                                    </MintContainer>
                                </>
                            )}
                            <Typography
                                variant="caption"
                                align="center"
                                display="block"
                                style={{ marginTop: 7, color: 'grey' }}
                            >
                                Powered by METAPLEX
                            </Typography>
                        </Paper>
                    </Container>
                </div>

                {/* Welcome text */}
                <div className="lg:text-[90px] md:text-[80px] text-[35px] font-bold mt-10 ">
                    <h1 className="font-['Atmospheric'] text-shadow text-white">FANCY FOX</h1>
                    <h1 className="font-['Atmospheric'] md:bottom-8 bottom-4 relative text-shadow text-white">ASSOCIATION</h1>
                </div>


                {mintTime ? (
                    <MintButton
                        candyMachine={candyMachine}
                        isMinting={isUserMinting}
                        setIsMinting={val => setIsUserMinting(val)}
                        onMint={onMint}
                        isActive={isActive || (isPresale && isWhitelistUser)}
                    />

                ) : (
                    <>
                        <div className='h-[400px] w-[100%] md:flex md:flex-col justify-center items-center  md:bottom-20 relative'>
                            <div className="lg:text-[50px] md:text-[40px] text-[22px] font-['Source Sans Pro'] font-[600] text-white font-['Atmospheric']">MINT COUNTDOWN</div>
                            <div className="flex relative">
                                <div className="bg-orange-700 text-white md:px-4 px-2 py-2 rounded border-2 border-orange-600 text-center lg:text-[45px] md:text-[25px] text-[20px] md:font-[900] font-[600] lg:min-w-[120px] md:min-w-[80px] min-w-[60px] mx-1">{days} <span className="block text-[10px] font-[500]">Days</span></div>
                                <div className="bg-orange-700 text-white md:px-4 px-2 py-2 rounded border-2 border-orange-600 text-center lg:text-[45px] md:text-[25px] text-[20px] md:font-[900] font-[600] lg:min-w-[120px] md:min-w-[80px] min-w-[60px] mx-1">{hours} <span className="block text-[10px] font-[500]">Hours</span></div>
                                <div className="bg-orange-700 text-white md:px-4 px-2 py-2 rounded border-2 border-orange-600 text-center lg:text-[45px] md:text-[25px] text-[20px] md:font-[900] font-[600] lg:min-w-[120px] md:min-w-[80px] min-w-[60px] mx-1">{minutes} <span className="block text-[10px] font-[500]">Minutes</span></div>
                                <div className="bg-orange-700 text-white md:px-4 px-2 py-2 rounded border-2 border-orange-600 text-center lg:text-[45px] md:text-[25px] text-[20px] md:font-[900] font-[600] lg:min-w-[120px] md:min-w-[80px] min-w-[60px] mx-1">{seconds} <span className="block text-[10px] font-[500]">Seconds</span></div>
                            </div>
                        </div>

                    </>
                )}


            </div>
        </>
    );
}

export default Hero;
