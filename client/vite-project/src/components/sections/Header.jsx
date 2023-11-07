import { useState, useEffect } from "react";
import SearchForm from "./SearchForm";
import Menu from "./Menu";
import MenuAuth from "./MenuAuth";
import Category from "./Category";

function Header({ showFav, setShowFav, showSub, setShowSub }) {
  // const [isMenuOpen, setIsMenuOpen] = useState(false);
  // const [user, setUser] = useState(false);

  // const toggleMenu = () => {
  //   setIsMenuOpen(!isMenuOpen);
  // };

  // const logout = () => {
  //   localStorage.clear(); //clear local storage
  //   setUser(false);
  // };

  // //get user from local storage
  // useEffect(() => {
  //   const loggedInUser = localStorage.getItem("user"); //"user" is mongodb data
  //   if (loggedInUser) {
  //     setUser(true);
  //   }
  // });

  return (
    <header className="fixed top-0 left-0 right-0 bg-black z-50">
      <div className="flex justify-center items-center md:ml-10 xs:ml-2">
          <Menu
            showFav={showFav}
            setShowFav={setShowFav}
            showSub={showSub}
            setShowSub={setShowSub}
          />
          <SearchForm />
        <div className="hidden md:flex justify-end items-center md:mr-10 xs:mr-0">
          <MenuAuth />
        </div>
      </div>
      <Category />
    </header>
  );
}

export default Header;
