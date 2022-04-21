import React, { useState, useEffect } from 'react';
import sanityClient from '../sanityClient';
import imageUrlBuilder from '@sanity/image-url'
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import TelegramIcon from '@mui/icons-material/Telegram';
import FacebookIcon from '@mui/icons-material/Facebook';
import YouTubeIcon from '@mui/icons-material/YouTube';
import Image from 'next/image';

const imageBuilder = imageUrlBuilder(sanityClient)

const url = (source) => {
    return imageBuilder.image(source)
}

const Footer = ({ icons }) => {
    const mediumBP = 768

    useEffect(() => {
        console.log(icons)
    })

    return (
        <div id="footer" className="h-[300px] py-20 relative">
            <div className="text-4xl mx-10 md:text-left text-center">
                <h1 className="font-['Atmospheric']">Join <span className="text-orange-600">FFA</span> Community</h1>
            </div>

            <div className="flex flex-wrap justify-center sm:mt-10">
                {/* Instagram */}
                <a href="https://twitter.com/fancyfoxassoc" target="_blank" rel="noreferrer" className="mx-7 "><img src={url(icons[4].icon.asset._ref)} className="relative md:h-12 md:w-12 h-8 w-8 md:top-1" /></a>
                {/* Twitter */}
                <a href="https://www.instagram.com/fancyfoxassociation/" target="_blank" rel="noreferrer" className="mx-7 "><img src={url(icons[5].icon.asset._ref)} className="relative md:h-12 md:w-12 h-8 w-8 md:top-1" /></a>
                {/* Telegram */}
                <a href="https://t.me/+cypOc8aptmhlNWQ1" target="_blank" rel="noreferrer" className="mx-7 "><img src={url(icons[2].icon.asset._ref)} className="md:top-2 relative md:h-12 md:w-12 h-8 w-8" /></a>
                {/* Facebook */}
                <a href="https://m.facebook.com/fancyfoxassociation/" target="_blank" rel="noreferrer" className="mx-7 "><img src={url(icons[6].icon.asset._ref)} className="md:top-2 relative md:h-12 md:w-12 h-8 w-8" /></a>
                {/* Youtube */}
                <a href="https://www.youtube.com/channel/UCeH7M3bIrCgtOiithGmnPsw" target="_blank" rel="noreferrer" className="mx-7 "><img src={url(icons[0].icon.asset._ref)} className="relative md:h-12 md:w-12 md:top-2 h-8 w-8" /></a>
                {/* Discord */}
                <a href="https://discord.gg/FfaMD5fnvn" target="_blank" rel="noreferrer" className="mx-7 "><img src={url(icons[3].icon.asset._ref)} className="md:top-2 relative md:h-12 md:w-12 h-8 w-8" /></a>
                {/* TikTok */}
                <a href="https://www.tiktok.com/@fancyfoxassociation" target="_blank" rel="noreferrer" className={`mx-7 relative top-2`}><img src={url(icons[1].icon.asset._ref)} className="relative md:h-12 md:w-12 h-8 w-8 bottom-2 md:bottom-0" /></a>
            </div>

            <div className="mt-5 flex justify-end mx-5">
                <h3 className="hidden">email</h3>
            </div>
            <div className="mx-10">
                <h1>Copyright © 2022 Fancy Fox Association</h1>
            </div>
        </div>
    );
}



export default Footer;
