import React, { useState } from 'react';
import { HiMenu, HiHome } from 'react-icons/hi';
import { MdOutlineWatchLater } from 'react-icons/md';
import { AiOutlineHeart } from 'react-icons/ai';
import { BsHandThumbsUp, BsHandThumbsDown } from 'react-icons/bs';
import youtubelogo from "../../assets/youtubelogo.png";
import { useLocation, useNavigate } from 'react-router-dom';

function HamburgerMenu() {
  const [isOpen, setIsOpen] = useState(true);
  const location = useLocation();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="w-200"> 
      <div className="flex justify-between items-center absolute md:top-10 md:left-10 xs:top-4 xs:left-4"> 
        <div className="ml-auto">
        <button
        className={`text-white hover:text-gray-200 focus:outline-none flex flex-col items-left justify-start`}
        onClick={toggleMenu}
        >
        {isOpen ? <HiMenu className="w-6 h-6" /> : <HiMenu className="w-6 h-6" />}
        </button>
       </div>
     <div className="flex items-center"> 
       <img className="youtubelogo md:w-10 md:h-10 xs:w-12 xs:h-12 mr-1" src={youtubelogo} alt="youtubelogo" />
       <div className="hidden sm:block text-white text-1xl">MyYouTube</div> 
     </div>
     </div>


      {isOpen && (
        <div className="bg-black text-white p-4 rounded-md absolute">
          <ul>
      
            {/* <li className="p-2">Welcome back, { location.state.id}</li> */}
            <div>
              <li className="flex items-center p-2">
                <div className="w-15 pr-5"><HiHome className="w-6 h-6" /></div>
                <a href="#" className="align-middle">Home</a>
              </li>
            </div>
            <div>
              <li className="flex items-center p-2">
                <div className="w-15 pr-5"><AiOutlineHeart className="w-6 h-6" /></div>
                <a href="#" className="align-middle">Subscribe</a>
              </li>
            </div>
            <div>
              <li className="flex items-center p-2">
                <div className="w-15 pr-5"><BsHandThumbsUp className="w-6 h-6" /></div>
                <a href="#" className="align-middle">Good</a>
              </li>
            </div>
            <div>
              <li className="flex items-center p-2">
                <div className="w-15 pr-5"><BsHandThumbsDown className="w-6 h-6" /></div>
                <a href="#" className="align-middle">Bad</a>
              </li>
            </div>
            <div>
              <li className="flex items-center p-2">
                <div className="w-15 pr-5"><MdOutlineWatchLater className="w-6 h-6" /></div>
                <a href="#" className="align-middle">Watch later</a>
              </li>
            </div>
          </ul>
        </div>
      )}
    </div>
  );
}

export default HamburgerMenu;
