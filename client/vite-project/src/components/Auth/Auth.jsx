import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { HiOutlineLogout, HiOutlineLogin } from "react-icons/hi";

function Auth({ isDrawerOpen, setIsDrawerOpen }) {
  const [user, setUser] = useState();
  const navigate = useNavigate();
  const VITE_HOST = import.meta.env.VITE_HOST;

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    toast.success("Logged out successfully!");
    setIsDrawerOpen(!isDrawerOpen);
    navigate("/");
  };
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
          console.log(res.data);
        });
      toast.success("Sign in successful!");
      navigate("/");

        setIsDrawerOpen(!isDrawerOpen);
    } catch (error) {
      console.error("Error signing in:", error);
      toast.error("Sign in failed");
    }
  };
  const checkIfUserIsLoggedIn = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setUser(user);
    }
  };
  useEffect(() => {
    checkIfUserIsLoggedIn();
  }, [isDrawerOpen]);

  return (
    <>
      {!user ? (
        <>
          <li>
            <button
              className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              onClick={() => {
                navigate("/signin");
              }}
            >
              <HiOutlineLogin className="text-lg" />
              <span className="ml-3 text-xl md:text-base">Sign in</span>
            </button>
          </li>
          <li>
            <button
              className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              onClick={() => {
                navigate("/signup");
              }}
            >
              <HiOutlineLogin className="text-lg" />
              <span className="ml-3 text-xl md:text-base">Sign up</span>
            </button>
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
    </>
  );
}

export default Auth;
