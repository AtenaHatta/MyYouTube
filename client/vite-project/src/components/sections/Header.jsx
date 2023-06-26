import React, { useState, useEffect } from "react";
import SearchForm from "../pages/SearchForm";
import { VscAccount } from "react-icons/vsc";
import { BiBell } from "react-icons/bi";
import { Link } from "react-router-dom";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const logout = () => {
    localStorage.clear(); //clear local storage
    setUser(false);
  };

  //get user from local storage
  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");//"user" is mongodb data
    if (loggedInUser) {
      setUser(true);
    }
  });

  return (
    <header className="relative mr-15 flex justify-between align-center mb-1 sm:mt-[60px] lg:mt-0">
    <div className="container mx-auto my-8">
      <SearchForm />
    </div>
    <div className="flex justify-end items-center relative z-10 md:mr-10 xs:mr-0 xs:absolute xs:right-0 xs:top-0  sm:right-0 sm:top-[-30px]  md:right-5 md:top-8"> 
      <BiBell className="w-5 h-5 text-white m-5" />
      <VscAccount
        className="w-5 h-5 text-white m-5 cursor-pointer relative z-20"
        onClick={toggleMenu}
      />
      {isMenuOpen && (
      <div className="bg-gray-700 text-white p-4  mr-2 rounded-md w-22 absolute top-12 z-30">
        <ul>
          {user ? (
            <li>
              <Link to="/" onClick={logout}>
                Logout
              </Link>
            </li>
          ) : (
            <>
              <li >
                <Link to="/signin">Sign in</Link>
              </li>
              <li >
                <Link to="/signup">Sign up</Link>
              </li>
            </>
          )}
        </ul>
     
      </div>
    )}
  </div>
</header>


  );
}

export default Header;
