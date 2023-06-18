import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";


function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  //send this data to backend
  const VITE_HOST = import.meta.env.VITE_HOST;
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post(`${VITE_HOST}/user/signin`, {
        email,
        password,
      }).then((res) => {
        //put token in local storage
        localStorage.setItem("token", res.data.user);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        navigate("/");
      });
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };


  return (
    <div className="flex flex-col items-center justify-center min-h-screen m-3">
      <div className="w-full max-w-md p-8 space-y-4 bg-white rounded-md shadow-md">
        <h2 className="text-2xl font-extrabold text-center text-gray-900">
          Sign In
        </h2>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              className="w-full px-3 py-2 mt-1 text-gray-900 placeholder-gray-400 border border-gray-300 rounded-md focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              className="w-full px-3 py-2 mt-1 text-gray-900 placeholder-gray-400 border border-gray-300 rounded-md focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              Sign in
            </button>
          </div>
          <div className="text-right">
          <span className="text-sm text-gray-400 pr-2">Don't have an account?</span>
            <Link to="/signup" className="text-sm text-red-600 hover:text-red-500">
              Sign up
            </Link>
          </div>
        </form>
      </div>
      <Link to="/" className="text-sm text-white hover:text-red-500 mt-5">back</Link>
    </div>
  );
}

export default SignIn;
