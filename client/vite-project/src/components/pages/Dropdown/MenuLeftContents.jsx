import { useState } from "react";
import { HiMenu } from "react-icons/hi";
import { IoClose } from "react-icons/io5";
import { MdOutlineWatchLater } from "react-icons/md";
import { HiHome, HiOutlineLogout, HiOutlineLogin } from "react-icons/hi";
import {
  AiFillHeart,
  AiOutlineFire,
  AiFillLike,
  AiFillDislike,
} from "react-icons/ai";

function MenuLeftContents() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const items = [
    { icon: <HiHome />, text: "Home", link: "/" },
    { icon: <AiFillHeart />, text: "Subscribe", link: "/subscribe" },
    { icon: <MdOutlineWatchLater />, text: "Watch later", link: "/watchlater" },
    { icon: <AiOutlineFire />, text: "Popular", link: "/popular" },
    { icon: <AiFillLike />, text: "Liked videos", link: "/likedvideos" },
    { icon: <AiFillDislike />, text: "Unliked videos", link: "/unlikedvideos" },
    {
      icon: <HiOutlineLogin />,
      text: "Sign in",
      link: "/signin",
      hiddenOnDesktop: true,
    },
    {
      icon: <HiOutlineLogin />,
      text: "Sign up",
      link: "/signup",
      hiddenOnDesktop: true,
    },
    {
      icon: <HiOutlineLogout />,
      text: "Log out",
      link: "/",
      hiddenOnDesktop: true,
    }
  ];

  return (
    <div className="w-200 relative z-10">
      <button
        onClick={toggleDrawer}
        className="text-white text-3xl px-1 py-2.5 mr-2"
        type="button"
      >
        <HiMenu />
      </button>
      <div
        className={`fixed inset-0 bg-black opacity-50 z-30 ${
          isDrawerOpen ? "block" : "hidden"
        }`}
        onClick={toggleDrawer}
      ></div>
      <div
        className={`fixed top-0 left-0 z-40 h-screen p-4 overflow-y-auto transition-transform ${
          isDrawerOpen ? "" : "-translate-x-full"
        } bg-white w-64 dark:bg-gray-800`}
        tabIndex="-1"
      >
        <h5 className="text-xl md:text-lg font-semibold text-gray-500 uppercase dark:text-gray-400">
          Menu
        </h5>
        <button
          type="button"
          onClick={toggleDrawer}
          className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-lg w-8 h-8 absolute top-2.5 right-2.5 inline-flex items-center justify-center dark:hover:bg-gray-600 dark:hover:text-white"
        >
          <IoClose />
          <span className="sr-only">Close menu</span>
        </button>
        <div className="py-4 overflow-y-auto">
          <ul className="space-y-2 font-medium">
            {items?.map((item, index) => (
              <li
                key={index}
                className={item.hiddenOnDesktop ? "md:hidden" : ""}
              >
                <a
                  href={item.link}
                  className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                >
                  {item.icon}
                  <span className="ml-3 text-xl md:text-base">
                    {item.text}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default MenuLeftContents;
