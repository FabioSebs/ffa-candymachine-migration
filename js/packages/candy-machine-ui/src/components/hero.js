import React, { useEffect, useState, useContext } from 'react';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import CardMembershipIcon from '@mui/icons-material/CardMembership';
import NFT from "../assets/NFT.png"
import { useSelector, useDispatch } from 'react-redux';
import { timeAction } from '../reducers/time'
import { useCookies } from 'react-cookie'
const change = () => ({ mintTime: true })

const Hero = () => {
    const [cookies, setCookies] = useCookies(false);
    const dispatch = useDispatch();
    const time = useSelector((state) => state.time.value)
    const [mintTime, setMintTime] = useState(false)
    const [days, setDays] = useState(0)
    const [hours, setHours] = useState(0)
    const [minutes, setMinutes] = useState(0)
    const [seconds, setSeconds] = useState(0)

    useEffect(() => {

        const target = new Date("3/31/2022 00:00:00")
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

        if (mintTime) {
            setCookies('time', true, { path: '/' })
            // dispatch(timeAction({mintTime : true}))
        }

        return () => clearInterval(interval)
    }, [mintTime])
    return (
        <div>

            <div className="mx-12 md:h-[600px] h-[500px] flex-col w-full lg:justify-between justify-center">
                {/* Welcome text */}
                <div className="lg:flex lg:flex-row justify-around items-center mt-10 ">
                    <div>
                        <h1 className="lg:text-[90px] md:text-[80px] text-[35px] font-bold font-['Atmospheric'] text-shadow text-white">FANCY FOX</h1>
                        <h1 className="lg:text-[90px] md:text-[80px] text-[35px] font-bold font-['Atmospheric'] md:bottom-8 bottom-4 relative text-shadow text-white">ASSOCIATION</h1>
                    </div>
                    {/* Connect wallet button */}
                    <div className="h-[150px] w-full flex-col text-center relative">
                        <h1 className='md:top-10 md:relative top-0 text-white'>As Seen On</h1>
                        <img src={NFT} alt="nft" height={100} width={100} className="invert mx-auto" />
                    </div>

                </div>




                {mintTime ? (
                    <h1></h1>
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
        </div>
    );
}

export default Hero;
