import { useState } from 'react';
// import Link from 'next/link'
// import Image from 'next/image'
import InfoIcon from '@mui/icons-material/Info';
import MapIcon from '@mui/icons-material/Map';
import GroupsIcon from '@mui/icons-material/Groups';
import ForumIcon from '@mui/icons-material/Forum';
import HelpCenterIcon from '@mui/icons-material/HelpCenter';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { Link as ScrollLink } from "react-scroll";
import Stryker from '../assets/Stryker.png';
import AboutUs from './aboutUs';

const NavBar = () => {
    const [open, setOpen] = useState(true)

    const handleClick = () => {
        setOpen(!open)
    }

    return (
        <nav className={`transition-all duration-700 ${open ? "bg-transparent" : "bg-black"}`}>
            <div className=" mx-auto flex justify-between items-center mx-12">
                {/* Logo */}

                <div className="relative top-2 ml-10">
                    <img src={Stryker} className="w-[150px] h-[100px]" />
                </div>

                {/* Hamburger Menu */}
                {/* To do: Make the contents visible when clicked */}
                <a className="text-white p-[1px] sm:block md:hidden display-none mr-10">
                    {open ? <MenuIcon onClick={handleClick} /> : <CloseIcon onClick={handleClick} />}
                </a>

                {/* Hyperlinks */}
                {/* To do: Change font */}
                <div className={`font-['Helvetica'] flex items-center md:flex-row flex-col justify-center bg-black md:bg-transparent md:static absolute md:z-auto z-[1]  left-0 w-full md:w-auto md:pl-0 pl-9 transition-all duration-700 ease-in ${!open ? 'top-[100px] opacity-100' : 'top-[-490px] md:opacity-100 opacity-0 z-[-1]'}`}>
                    <ScrollLink activeClass='nav-active' to={"aboutus"} smooth={true} duration={300} offset={-50}><a className="font-['Atmospheric'] lg:px-3 md:px-1 py-2 text-white font-[700] hover:text-orange-300 hover:underline md:text-[13px] lg:text-[18px] flex gap-1 items-center transition duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 hover:cursor-pointer">About Us <InfoIcon className="w-4 h-4 " /> </a></ScrollLink>
                    <ScrollLink activeClass='nav-active' to={"map"} smooth={true} duration={300} offset={-50}><a className="font-['Atmospheric'] lg:px-3 md:px-1 py-2 text-white font-[700] hover:text-orange-300 hover:underline md:text-[13px] lg:text-[18px] flex gap-1 items-center transition duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 hover:cursor-pointer">Fox Map <MapIcon className="w-4 h-4" /></a></ScrollLink>
                    <ScrollLink activeClass='nav-active' to={"team"} smooth={true} duration={300} offset={-50}><a className="font-['Atmospheric'] lg:px-3 md:px-1 py-2 text-white font-[700] hover:text-orange-300 hover:underline md:text-[13px] lg:text-[18px] flex gap-1 items-center transition duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 hover:cursor-pointer">Team <GroupsIcon className="w-4 h-4" /></a></ScrollLink>
                    <ScrollLink activeClass='nav-active' to={"faq"} smooth={true} duration={300} offset={-50}><a className="font-['Atmospheric'] lg:px-3 md:px-1 py-2 text-white font-[700] hover:text-orange-300 hover:underline md:text-[13px] lg:text-[18px] flex gap-1 items-center transition duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 hover:cursor-pointer">FAQ <HelpCenterIcon className="w-4 h-4" /></a></ScrollLink>
                    <ScrollLink activeClass='nav-active' to={"footer"} smooth={true} duration={300} offset={-50}><a className="font-['Atmospheric'] lg:px-3 md:px-1 py-2 text-white font-[700] hover:text-orange-300 hover:underline md:text-[13px] lg:text-[18px] flex gap-1 items-center transition duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 hover:cursor-pointer">Community <ForumIcon className="w-4 h-4" /></a></ScrollLink>
                </div>

            </div>

        </nav>
    )
}

export default NavBar;