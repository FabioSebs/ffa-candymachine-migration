// import Image from 'next/image'
import NichoFox from '../assets/FancyFoxAKing.png';
import Nicho from '../assets/nicho.png'
import DennisFox from '../assets/FancyFoxAPIRATE.png';
import Dennis from '../assets/den.png';
import Monique from '../assets/monique.png';
import MoniqueFox from '../assets/chef_NFT_yellow_bg.png';
import FabioFox from '../assets/astronaut_NFT_galaxy_bg.png';
import Fabio from '../assets/fabio.png';
import JocelynFox from '../assets/raincoat_bird_pink_bg.png';
import Jocelyn from '../assets/joce.png';
import MattFox from '../assets/karatenew.png';
import Matt from '../assets/mat.png';
import CalvinFox from '../assets/police_NFT_purp_bg.png';
import Calvin from '../assets/calvin.png';
import JarrenFox from '../assets/santa_green_bg.png';
import Jarren from '../assets/jar.png';
import DanielFox from '../assets/VikingNew.png'
import Daniel from '../assets/dan.png';

const members = [
    {
        image: NichoFox,
        image2: Nicho,
        name: "Nicholas Liubern",
        position: "Founder",
        link:"https://www.instagram.com/nicholasliubern/",
    },
    {
        image: DennisFox,
        image2: Dennis,
        name: "Dennis Rubianto",
        position: "Co-Founder",
        link:"https://www.instagram.com/dennisrubianto7/",
    },
    {
        image: MoniqueFox,
        image2: Monique,
        name: "Monique Senjaya",
        position: "System Developer",
        link:"https://www.linkedin.com/in/monique-senjaya-06a33115a/",
    },
    {
        image: FabioFox,
        image2: Fabio,
        name: "Fabio Espinoza",
        position: "System Developer",
        link:"https://www.linkedin.com/in/fabio-espinoza-bb616211b",
    },
    {
        image: JocelynFox,
        image2: Jocelyn,
        name: "Jocelyn Liusharon",
        position: "Graphic Artist",
        link:"https://www.instagram.com/joceliu_/",
    },
    {
        // wizard
        image: CalvinFox,
        image2: Calvin,
        name: "Calvin Halim",
        position: "Graphic Artist",
        link:"https://www.instagram.com/clv27_/",
    },
    {
        image: MattFox,
        image2: Matt,
        name: "Matthew Sutanto",
        position: "Social Media Manager",
        link:"https://www.instagram.com/tjanmatthew/",
    },
    {
        image: JarrenFox,
        image2: Jarren,
        name: "Jarren Erniody",
        position: "Community Manager",
        link:"https://www.instagram.com/f3stivepyro/",
    },
    {
        image: DanielFox,
        image2: Daniel,
        name: "Daniel Kurniawan",
        position: "Community Manager",
        link:"https://www.instagram.com/daniel.dk2505/",
    },
]


const Team = () => {
    return (
        <>
            <div id="team" className="flex flex-col mx-10 md:my-5 justify-center items-center">
                {/* FFA FAMILY */}
                <div className="flex flex-col justify-center mt-20">
                    <h3 className="text-5xl font-['Atmospheric'] text-white"><span className="text-orange-500 font-bold">FFA</span> FAMILY</h3>
                    <h5 className='text-center'>*Click to know more about us!</h5>
                </div>

                {/* MEMBERS */}
                <div className="flex flex-wrap m-10 w-full justify-center my-[70px] relative ">
                    {members.map((member) => {
                        return (

                            <div key={member.name} className="mx-10 md:mb-10 items-center py-10 md:my-0 my-5">
                                {/* Image */}
                                <div className='relative mb-[80px]'>
                                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[150px] h-[150px]">
                                        <img className="rounded-full hover:opacity-0 active:opacity-0 animation:fade transition-all duration-300" src={member.image} layout={"fill"} />
                                    </div>
                                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[150px] h-[150px]">
                                        <img className="rounded-full opacity-0 hover:opacity-100 active:opacity-100 animation:fade transition-all duration-300" src={member.image2} layout={"fill"} />
                                    </div>

                                </div>

                                <a href={member.link} target="_blank" rel="noreferrer"><div className="bg-orange-700 border-orange-600 rounded px-3">
                                    {/* Name */}
                                    <h3 className="font-bold text-[20px] text-center">{member.name}</h3>
                                    {/* Position */}
                                    <h3 className="text-center">{member.position}</h3>
                                </div>
                                </a>
                            </div>

                        )
                    })}
                </div>
            </div>
        </>
    );
}

export default Team;