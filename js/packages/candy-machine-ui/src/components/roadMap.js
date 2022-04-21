import React, { useState, useEffect, useRef } from 'react';
import CropSquareIcon from '@mui/icons-material/CropSquare';

const breakPoints = {
    0: 1500,
    1: 1650,
    2: 1800,
    3: 1950,
    4: 2100,
    5: 2250,
    6: 2400,
    7: 2550,
    8: 2700,
    9: 2850,
    10: 3000,
    11: 3150,
    12: 3300,
    13: 3450,
}

const roadMapContent = [
    {
        month: "March 2022",
        plan: "Website Launch",
        content: "Completion of our website, you can start to visit our website around march, we will surprise you!"
    },
    {
        month: "April 2022",
        plan: "Connect with Influencers",
        content: "We will connect with impactful influencers to increase our brand image world wide."
    },
    {
        month: "May 2022",
        plan: "Whitelisting",
        content: "500 Foxies that got whitelisted can mint live on our own website. Production of merchandise, we will start producing merchandise for you foxies to buy, we guarantee that the price will be affordable. After whitelisting, we are happily donating 10% of our sales to small organizations that are in need of funds."
    },
    {
        month: "Early June 2022",
        plan: "Official Launching of FFA Batch 1",
        content: "We will be launching around 8,650 Fancy Foxes through public live minting. You might wonder where did the remaining pieces go? You will find it in the giveaway. After our NFTs are on sale we will donate 10% to a small organization chosen by the community. 1 Fancy Fox = 1 Vote. Buy land in Metaverse, After the whitelisting, we will buy land in a metaverse, What’s this Land for? We are going to make an art gallery or game arena."
    },
    {
        month: "Late June 2022",
        plan: "Merchandise Available For Sale",
        content: "Foxies will be able to buy merch on our official website. Of course, we will giveaway our merch to lucky Silver Foxies."
    },
    {
        month: "July 2022",
        plan: "Action Figure and Doll Giveaway",
        content: "We will also be giving away action figure and dolls to a few lucky Platinum Foxies. Hopefully production of Custom Action Figure and Doll, After collecting your Fancy Foxes, you can contact us if you want to have your Foxes made as an Action Figure or Doll."
    },
    {
        month: "August 2022",
        plan: "Launching Of FFA Batch 2",
        content: "We will be launching FFA batch 2, you might wonder what we are going to launch for batch 2. We will of course donate 10% of our sales from batch 2 to a small organization that is in need. 1 Fancy Fox = 1 Vote"
    },
    {
        month: "October 2022",
        plan: "Surprise!",
        content: "We are going to surprise you with integrating NFT! Don’t miss this out. It will be the most unique part of our project."
    },
    {
        month: "December 2022 ",
        plan: "Raffle",
        content: "Raffle for our limited edition NFT art, we will launch only a few NFT art, that is very fascinating. Not everyone can buy this art, only Swift can register to buy."
    },
    {
        month: "Quarter 1 2023",
        plan: "Connecting to metaverse",
        content: "We hopefully will create an art gallery in the Metaverse. Some of your Fancy Foxes will be displayed up there. Stay Tune!"
    },
    {
        month: "Quarter 2 2023",
        plan: "Convention",
        content: "We are very excited to announce that we are hopefully going to have a big convention. Give your ideas where we should held it!"
    },
    {
        month: "Quarter 3 2023",
        plan: "App unlocked",
        content: "We are going to create an app to connect our Foxies around the world. We will also Launch our own token to be used in our upcoming game."
    },
    {
        month: "Quarter 4 2023",
        plan: "Unideck trading game",
        content: "We will launch a trading card game in the metaverse. Launching one of the best card games that will happen in the metaverse."
    },
    {
        month: "Additional",
        plan: "",
        content: "Sudden giveaway can happen any time. So stay tuned!"
    },
]

const RoadMap = () => {
    const [pageHeight, setPageHeight] = useState(0)
    const roadmapList = useRef()

    const handleScroll = () => {
        setPageHeight(window.pageYOffset)
    }

    // HANDLE IN SETTING SYMBOL ARRAY
    useEffect(() => {
        window.addEventListener("scroll", handleScroll)

        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])

    // HANDLE BROWSER SCROLLING DOWN
    useEffect(() => {
        for (const key in breakPoints) {
            const symbol = document.getElementById(key)

            if (pageHeight >= breakPoints[key]) {
                symbol.classList.add("lightup")
            }
        }
    }, [pageHeight])

    // JSX
    return (
        <div className="bg-black bg-opacity-60 md:top-[30px] top-[-30px] relative">

            {/* TITLE */}
            <div id="map" className="h-[150px] flex items-center justify-center mb-10">
                <div className='w-[100%] md:ml-0 ml-[20px]'>
                    <h3 className="float-left w-[100%] md:text-[3.2rem] text-[2rem] text-center m-0 font-['Atmospheric']">Fancy Fox </h3>
                    <h3 className="clear-left w-[100%] md:text-[3.4rem] text-[2.1rem] text-center text-orange-500 bottom-5 relative font-[500] font-['Atmospheric']">ROAD MAP </h3>
                </div>
            </div>

            {/* ROADMAP */}

            <ul ref={roadmapList}>
                {/* January */}
                {roadMapContent.map((div, idx) => {
                    return (
                        <div key={idx}>
                            <div className='justify-center items-center w-full flex'>
                                <li className="flex flex-row justify-center mb-[80px] w-[90%] h-[200px]">

                                    <div className="flex sm:basis-1/3 basis-1/2">
                                        {/* DATE/TITLE */}
                                        <div className="flex flex-col md:w-[40%] w-[10%] basis-2/3 pt-8">
                                            <h5 className="text-[1.2rem] md:text-[1.4rem] lg:text-[1.6rem]"> {div.month}</h5>
                                            <h2 className='text-[.8rem] md:text-[1rem] lg:text-[1.3rem] font-[600]'> {div.plan} </h2>
                                        </div>
                                        {/* SYMBOL */}
                                        <div className={`relative sm:basis-2/3 basis-1/2 basis-0`}>
                                            <span className='h-[100%] w-[3px] bg-white block absolute top-10 left-[14px]'> </span>
                                            <CropSquareIcon id={idx} className="w-[2rem] h-[2rem] rotate-45 transition duration-300 ease-in-out" />
                                        </div>
                                    </div>

                                    {/* TEXT CONTENT */}
                                    <div className={`basis-2/3 w-full flex  h-full pt-8`}>
                                        <p className='text-white px-0 md:px-0 text-[.6rem] sm:text-[.9rem] lg:text-[1rem] xl:text-[1.3rem] mr-4 text-justify'>{div.content}</p>
                                    </div>

                                </li>
                            </div>

                        </div>
                    )
                })}
            </ul>

        </div>
    );
}//${idx == 2 || idx == 3 || idx == 5 ? "items-center top-8 tracking-tighter relative" : "items-center"} ${idx == 4 || idx == 7 || idx == 9 || idx == 11 ? "items-center bottom-7 tracking-tighter relative" : "items-center"} 
//${idx == 3 || idx == 4 ? "xl:top-[-20px] top-[-70px]" : idx == 7 || idx == 8 ? "xl:top-[-20px] top-[-30px]" : idx == 13 ? "xl:top-[-20px] top-[0px]" : "xl:top-[-20px] top-[-40px]"}
export default RoadMap;