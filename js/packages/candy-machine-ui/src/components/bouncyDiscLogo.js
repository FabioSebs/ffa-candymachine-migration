import React from 'react'
import imageUrlBuilder from '@sanity/image-url'
import sanityClient from "./sanityClient"

const imageBuilder = imageUrlBuilder(sanityClient)

const url = (source) => {
    return imageBuilder.image(source)
}

function bouncyDiscLogo() {
    return (
        <div className='sticky animate-bounce z-[100] top-0'>
            <a href="https://discord.gg/FfaMD5fnvn" target="_blank" rel="noreferrer"><img src={url("image-bda5a76fc8424b02f9a1bccf464a785faec12dfe-512x512-png")}  height={50} width={50} className="sticky md:h-14 md:w-14 h-14 w-14 bg-black p-2 rounded-full hover:cursor-pointer top-0" /></a>
        </div>
    )
}

export default bouncyDiscLogo