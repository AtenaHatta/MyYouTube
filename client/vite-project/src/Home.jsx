import React from 'react';
import Header from './components/sections/Header';
import Category from './components/sections/Category';
import Main from './components/sections/Main';
import HamburgerMenu from './components/sections/HamburgerMenu';


function Home(){
 return (
  <>
    <div className="flex justify-evenly">
      <HamburgerMenu />
      <div>
      <Header />
      <Category />
      <Main />
      </div>
    </div>
  </>
 )
}

export default Home


