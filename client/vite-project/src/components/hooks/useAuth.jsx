// useAuth.js
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

export function useAuth() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const navigate = useNavigate();
  const VITE_HOST = import.meta.env.VITE_HOST;

  useEffect(() => {
    checkIfUserIsLoggedIn();
  }, []);

  const checkIfUserIsLoggedIn = () => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  };

  const signIn = async (credentials) => {
    try {
      const response = await axios.post(
        `${VITE_HOST}/user/signin`,
        credentials
      );
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      setUser(response.data.user);
      toast.success("Signed in successfully!");
      navigate("/");
    } catch (error) {
      console.error("Error signing in:", error);
      toast.error("Sign in failed");
    }
  };

  const signUp = async (credentials) => {
    try {
      const response = await axios.post(
        `${VITE_HOST}/user/signup`,
        credentials
      );
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      setUser(response.data.user);
      toast.success("Account created successfully!");
      navigate("/");
    } catch (error) {
      console.error("Error signing up:", error);
      toast.error("Sign up failed");
    }
  };

  const demoSignIn = async () => {
    await signIn({ email: "demo@gmail.com", password: "111111" });
  };

  const logOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    toast.success("Logged out successfully!");
    navigate("/");
  };

  return {
    user,
    setUser,
    signIn,
    signUp,
    demoSignIn,
    logOut,
  };
}
