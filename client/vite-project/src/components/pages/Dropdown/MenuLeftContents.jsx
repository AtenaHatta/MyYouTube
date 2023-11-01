import { useEffect, useState } from "react";
import { MdOutlineWatchLater } from "react-icons/md";
import {
  HiHome,
  HiOutlineLogout,
  HiOutlineLogin,
  HiMenu,
} from "react-icons/hi";
import { AiFillHeart, AiOutlineFire, AiFillLike } from "react-icons/ai";
import { toast } from "react-toastify";
import youtubelogo from "../../../assets/youtubelogo.png";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import SubscribeMenu from "../Subscribe/SubscribeMenu";

function MenuLeftContents() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const items = [
    { icon: <HiHome />, text: "Home", link: "/" },
    { icon: <AiFillHeart />, text: "Subscribe", link: "/subscribe", authRequired: true },
    { icon: <MdOutlineWatchLater />, text: "Watch later", link: "/watchlater", authRequired: true },
    { icon: <AiOutlineFire />, text: "Popular", link: "/popular" },
    { icon: <AiFillLike />, text: "Liked videos", link: "/likedvideos", authRequired: true },
  ];

  const handleItemClick = (item) => {
    if (item.authRequired && !user) {
      navigate('/signin');
      toast.info("You need to sign in first");
    } else if (typeof item.link === 'string') {
      navigate(item.link);
    }
    toggleDrawer();
  };

  const filterItems = (items) => {
    if (user) {
      return items.filter(
        (item) => item.text !== "Sign in" && item.text !== "Sign up"
      );
    } else {
      return items.filter((item) => item.text !== "Log out");
    }
  };

  const checkIfUserIsLoggedIn = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setUser(user);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    toast.success("Logged out successfully!");
    toggleDrawer();
  };

  useEffect(() => {
    checkIfUserIsLoggedIn();
  }, [isDrawerOpen]);

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
        className={`fixed inset-0 bg-black opacity-40 z-30 ${
          isDrawerOpen ? "block" : "hidden"
        }`}
        onClick={toggleDrawer}
      ></div>
      <div
        className={`fixed top-0 left-0 z-40 h-screen p-4 overflow-y-auto transition-transform ${
          isDrawerOpen ? "" : "-translate-x-full"
        } bg-white w-64 dark:bg-black`}
        tabIndex="-1"
      >
        <div className="flex justify-center items-center">
          <button
            onClick={toggleDrawer}
            className="text-white text-3xl px-1 py-2.5 mr-2"
            type="button"
          >
            <HiMenu />
          </button>
          <img
            className="youtubelogo md:w-10 md:h-10 w-12 h-12 mr-1"
            src={youtubelogo}
            alt="youtubelogo"
          />
          <p className="text-white text-2xl font-roboto">MyYouTube</p>
        </div>
        <div className="py-4 overflow-y-auto">
          <ul className="space-y-2 font-medium">
            {items?.map((item, index) => (
              <li key={index} className={item.hiddenOnDesktop ? "md:hidden" : ""}>
                <button
                  onClick={() => handleItemClick(item)}
                  className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group w-full text-left"
                >
                  {item.icon}
                  <span className="ml-3 text-xl md:text-base">{item.text}</span>
                </button>
              </li>
            ))}
            {!user ? (
              <div className="md:hidden">
                <li>
                  <Link
                    to="/signin"
                    className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                  >
                    <HiOutlineLogin className="text-lg" />
                    <span className="ml-3 text-xl md:text-base">Sign in</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/signup"
                    className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                  >
                    <HiOutlineLogin className="text-lg" />
                    <span className="ml-3 text-xl md:text-base">Sign up</span>
                  </Link>
                </li>
              </div>
            ) : (
              <li className="md:hidden">
                <button
                  className="flex items-center w-full p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                  onClick={handleLogout}
                >
                  <HiOutlineLogout className="text-lg" />
                  <span className="ml-3 text-xl md:text-base">Logout</span>
                </button>
              </li>
            )}
        

            <SubscribeMenu />
         
          </ul>
        </div>
      </div>
    </div>
  );
}

export default MenuLeftContents;
