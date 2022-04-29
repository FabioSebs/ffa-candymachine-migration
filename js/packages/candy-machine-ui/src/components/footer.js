import React, { useState, useEffect } from 'react';
import imageUrlBuilder from '@sanity/image-url'
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import TelegramIcon from '@mui/icons-material/Telegram';
import FacebookIcon from '@mui/icons-material/Facebook';
import YouTubeIcon from '@mui/icons-material/YouTube';
// import Image from 'next/image';
import sanityClient from "./sanityClient"

const imageBuilder = imageUrlBuilder(sanityClient)

const url = (source) => {
    return imageBuilder.image(source)
}

const Footer = () => {
    const [icons, setIcons] = useState([])
    
    const mediumBP = 768;

    const getIcons = async () => {
        try {
            const res = await sanityClient.fetch(`*[_type == "icon"]`)
            setIcons(res)
        }
        catch(e){
            console.log(e)
        }
    }

    useEffect(() => {
        getIcons();
    }, [])

    return (
        <div id="footer" className="h-[300px] py-20 relative">
            <div className="text-4xl mx-10 md:text-left text-center">
                <h1 className="font-['Atmospheric'] uppercase text-white">JOIN <span className="text-orange-600">FFA</span> COMMUNITY</h1>
            </div>
         
            <div className="flex flex-wrap justify-center sm:mt-10">
                {/* Instagram */}
                <a href="https://twitter.com/fancyfoxassoc" target="_blank" rel="noreferrer" className="mx-7 "><img src={url("image-e2530da647045095041acad666f21a1c696933a3-2267x2267-png")} className="relative md:h-12 md:w-12 h-8 w-8 md:top-1" /></a>
                {/* Twitter */}
                <a href="https://www.instagram.com/fancyfoxassociation/" target="_blank" rel="noreferrer" className="mx-7 "><img src={url("image-c1277af875e43f79a396598c973215bcb755addc-466x460-png")} className="relative md:h-12 md:w-12 h-8 w-8 md:top-1" /></a>
                {/* Telegram */}
                <a href="https://t.me/+cypOc8aptmhlNWQ1" target="_blank" rel="noreferrer" className="mx-7 "><img src={url("image-92d9553736f96b2687bf7accd37fc2c35ce8e4a7-1000x1000-png")} className="md:top-2 relative md:h-12 md:w-12 h-8 w-8" /></a>
                {/* Facebook */}
                <a href="https://m.facebook.com/fancyfoxassociation/" target="_blank" rel="noreferrer" className="mx-7 "><img src={url("image-f4f855ccd759db4443555fd53c791210d46d5674-3244x3245-png")} className="md:top-2 relative md:h-12 md:w-12 h-8 w-8" /></a>
                {/* Youtube */}
                <a href="https://www.youtube.com/channel/UCeH7M3bIrCgtOiithGmnPsw" target="_blank" rel="noreferrer" className="mx-7 "><img src={url("image-712c0d48683b5a9cf3f2e7cbf5ee0070dc9cdd11-1000x1000-png")} className="relative md:h-12 md:w-12 md:top-2 h-8 w-8" /></a>
                {/* Discord */}
                <a href="https://discord.gg/FfaMD5fnvn" target="_blank" rel="noreferrer" className="mx-7 "><img src={url("image-bda5a76fc8424b02f9a1bccf464a785faec12dfe-512x512-png")} className="md:top-2 relative md:h-12 md:w-12 h-8 w-8" /></a>
                {/* TikTok */}
                <a href="https://www.tiktok.com/@fancyfoxassociation" target="_blank" rel="noreferrer" className={`mx-7 relative top-2`}><img src={url("image-dc28938d89c8fe567a60c41c594f583c6e6743a7-490x488-png")} className="relative md:h-12 md:w-12 h-8 w-8 bottom-2 md:bottom-0" /></a>
            </div>

            <div className="mt-5 flex justify-end mx-5">
                <h3 className="hidden">email</h3>
            </div>
            <div className="mx-10 text-white">
                <h1>Copyright © 2022 Fancy Fox Association</h1>
            </div>
        </div>
    );
}



export default Footer;
