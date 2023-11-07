import { useEffect, useState } from "react";
import { MdOutlineWatchLater } from "react-icons/md";
import {
  HiHome,
  HiOutlineLogout,
  HiOutlineLogin,
  HiMenu,
} from "react-icons/hi";
import { AiFillHeart } from "react-icons/ai";
import { toast } from "react-toastify";
import youtubelogo from "../../../assets/youtubelogo.png";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import SubscribeMenu from "../Subscribe/SubscribeMenu";
import axios from "axios";
import Auth from "../../Auth/Auth";

function MenuLeftContents() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const VITE_HOST = import.meta.env.VITE_HOST;

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const items = [
    { icon: <HiHome />, text: "Home", link: "/" },
    {
      icon: <AiFillHeart />,
      text: "Subscribe",
      link: "/subscribe",
      authRequired: true,
    },
    {
      icon: <MdOutlineWatchLater />,
      text: "Watch later",
      link: "/watchlater",
      authRequired: true,
    },
  ];

  const handleItemClick = (item) => {
    if (item.authRequired && !user) {
      navigate("/signin");
      toast.info("You need to sign in first");
    } else {
      navigate(item.link);
    }
    toggleDrawer();
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

  //demo user
  const demoUser = async () => {
    try {
      await axios
        .post(`${VITE_HOST}/user/signin`, {
          email: "demo@gmail.com",
          password: "111111",
        })
        .then((res) => {
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("user", JSON.stringify(res.data.user));
        });
      toast.success("Sign in successful!");
      toggleDrawer();
      navigate("/");
    } catch (error) {
      console.error("Error signing in:", error);
      toast.error("Sign in failed");
    }
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
        title="Menu"
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
            title="menu"
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
              <li
                key={index}
                className={item.hiddenOnDesktop ? "md:hidden" : ""}
              >
                <button
                  onClick={() => handleItemClick(item)}
                  title="account"
                  className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group w-full text-left"
                >
                  {item.icon}
                  <span className="ml-3 text-xl md:text-base">{item.text}</span>
                </button>
              </li>
            ))}
            <div className="md:hidden">

            <Auth
              isDrawerOpen={isDrawerOpen}
              setIsDrawerOpen={setIsDrawerOpen}
            />
            </div>
            <SubscribeMenu isDrawerOpen={isDrawerOpen} />
          </ul>
        </div>
      </div>
    </div>
  );
}

export default MenuLeftContents;
