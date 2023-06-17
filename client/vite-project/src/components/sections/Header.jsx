import React, { useState, useEffect } from "react";
import SearchForm from "../pages/SearchForm";
import { VscAccount } from "react-icons/vsc";
import { BiBell } from "react-icons/bi";
import { GrFormClose } from "react-icons/gr";
import { Link, useNavigate } from "react-router-dom";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const logout = () => {
    localStorage.clear();
    setUser(false);
  };

  //get user from local storage
  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      setUser(true);
    }
  });

  return (
    <header className="relative mr-15 flex justify-between align-center mb-3">
      <div className="container mx-auto my-8">
        <SearchForm />
      </div>
      <div className="flex justify-end relative z-10">
        <BiBell className="w-5 h-5 text-white m-5" />
        <VscAccount
          className="w-5 h-5 text-white m-5 cursor-pointer relative z-20"
          onClick={toggleMenu}
        />
        {isMenuOpen && (
          <div className="bg-gray-700 text-white p-4 mt-2 mr-2 rounded-md w-40 absolute right-0 z-30">
            <ul>
              {user ? (
                <li>
                  <Link to="/" onClick={logout}>
                    Logout
                  </Link>
                </li>
              ) : (
                <>
                  <li>
                    <Link to="/signin">Sign in</Link>
                  </li>
                  <li>
                    <Link to="/signup">Sign up</Link>
                  </li>
                </>
              )}
            </ul>
            <button
              className="text-white hover:text-gray-200 absolute top-2 right-2 flex items-center justify-center"
              onClick={closeMenu}
            >
              <GrFormClose style={{ color: "white" }} className="w-7 h-7" />
            </button>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
