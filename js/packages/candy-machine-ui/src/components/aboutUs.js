// import Image from 'next/image'
import ReactTypingEffect from 'react-typing-effect';
import FoxGif from '../assets/fox.gif';
import Big from '../assets/big.png';
import Small from '../assets/smol.png';
const AboutUs = () => {
    return (
        <>
            <div id="aboutus" className="flex flex-col justify-between items-center">
                {/* GIF */}
               
                    <div className='md:w-[350px] md:h-[350px] w-[200px] h-[200px] relative mb-10'>
                        <img src={FoxGif} layout='fill' objectFit='contain' />
                    </div>  

                {/* SPAN */}
                {/* <div className='py-7 mx-8 h-full relative lg:right-5 md:block hidden'> <span className='w-2 h-full bg-white block rounded-lg'> </span></div> */}

                {/* ABOUT */}
                <div className="flex flex-col justify-between items-center h-[500px] mb-20">
                    <div className="hidden md:block">
                    <img src={Big} className='w-[1400] h-[550px]' />
                    </div>
                    <div className=" block md:hidden">
                    <img src={Small} className='w-[390px] h-[460px] block md:hidden'/>
                    </div>
                    <div className='my-6 absolute flex flex-col items-center lg:mt-20 mt-10 pt-5 xxxxxxl:px-[4000px] xxxxxl:px-[3000px] xxxxl:px-[2000px] xxxl:px-[1200px] x2l:px-[550px] x3l:px-[1000px] xl:px-[300px] lg:px-[200px] md:px-[130px] sm:px-[100px] px-5'>
                        <ReactTypingEffect
                            text={["D' Origin"]}
                            speed={100}
                            eraseSpeed={200}
                            eraseDelay={4000}
                            className="text-3xl w-[75%] text-center text-black lg:mt-0 md:mt-5 md:text-4xl lg:text-4xl xl:text-6xl font-['Atmospheric']"
                        />
                        <p className="mt-5 w-[75%] text-black text-sm xl:text-xl lg:text-base md:text-base sm:text-xs text-center ">9,189 foxes were forced to migrate into Uznanium forest due to a tragic wildfire caused by lightning that struck their habitat. A stray of luminous light blinded them, evolving each and every one of them into a herd of fancy foxes with human-like abilities. They started building and maintaining their own ecosystem – their own association to rule the world. Be one of the foxies to tame them before they eat you alive!</p>
                    </div>
                </div>
                    
            </div>
            {/* Big Numbers */}
            {/* <div className='relative flex justify-around md:mt-[150px] mt-[50px]'>
                <h1 className='text-[1.8rem] md:text-8xl'>9</h1>
                <h1 className='text-[1.8rem] md:text-8xl'>1</h1>
                <h1 className='text-[1.8rem] md:text-8xl'>8</h1>
                <h1 className='text-[1.8rem] md:text-8xl'>9</h1>
            </div>
            <div className='relative flex justify-around md:mb-[150px] mb-[50px]'>
                <h1 className='basis-1/4 text-center text-[0.6rem] md:text-3xl md:px-3 px-1'>Represents Trust, stability and luck</h1>
                <h1 className='basis-1/4 text-center text-[0.6rem] md:text-3xl md:px-3 px-1'>We aim to be the number 1 NFT Collection in the world by proving ourselves that we can.</h1>
                <h1 className='basis-1/4 text-center text-[0.6rem] md:text-3xl md:px-3 px-1'>Symbolizes infinity, meaning that there are no limits to what we can be and to be everlasting.</h1>
                <h1 className='basis-1/4 text-center text-[0.6rem] md:text-3xl md:px-3 px-1'>The biggest single digit number, showing that we are going to be the biggest NFT Community.
</h1>
            </div> */}
        </>
    );
}

export default AboutUs;