import { useEffect, useState } from "react";
import { VscAccount } from "react-icons/vsc";
import { IoClose } from "react-icons/io5";
import { Link } from "react-router-dom";
import { HiOutlineLogout, HiOutlineLogin } from "react-icons/hi";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function MenuRightContents() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [user, setUser] = useState(null);
  const VITE_HOST = import.meta.env.VITE_HOST;
  const navigate = useNavigate();

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
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

  return (
    <div className="w-200 relative z-10">
      <button
        onClick={toggleDrawer}
        className="text-white text-3xl px-1 py-2.5 mr-2"
        type="button"
      >
        <VscAccount className="w-5 h-5 text-white m-5" />
      </button>
      <div
        className={`fixed inset-0 bg-black opacity-40 z-30 ${
          isDrawerOpen ? "block" : "hidden"
        }`}
        onClick={toggleDrawer}
      ></div>
      <div
        className={`fixed top-0 right-0 z-40 h-screen p-4 overflow-y-auto transition-transform ${
          isDrawerOpen ? "" : "translate-x-full"
        } bg-white w-64 dark:bg-black`}
        tabIndex="-1"
      >
        <h5 className="text-xl md:text-lg font-semibold text-gray-500 uppercase dark:text-gray-400 text-center">
          Account
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
          <ul className="space-y-2 font-medium text-white">
            {!user ? (
              <>
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
                <li>
                  <button
                    className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group w-full"
                    onClick={demoUser}
                  >
                    <HiOutlineLogin className="text-lg" />
                    <span className="ml-3 text-xl md:text-base text-red-500">
                      Demo account
                    </span>
                  </button>
                </li>
              </>
            ) : (
              <li>
                <button
                  className="flex items-center w-full p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                  onClick={handleLogout}
                >
                  <HiOutlineLogout className="text-lg" />
                  <span className="ml-3 text-xl md:text-base">Logout</span>
                </button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default MenuRightContents;
