import React from 'react';
import Header from './sections/Header';
import Category from './sections/Category';
import Main from './sections/Main';
import HamburgerMenu from './sections/HamburgerMenu';


function Home(){
 return (
  <>
      <Header />
    <div className="flex justify-evenly">
      <HamburgerMenu />
      <div>
      <Category />
      <Main />
      </div>
    </div>
  </>
 )
}

export default Home


