import { useState, useEffect } from "react";
import Header from "./sections/Header";
import Category from "./sections/Category";
import HamburgerMenu from "./sections/HamburgerMenu";
import CardWrapper from "./sections/CardWrapper";

import { useParams } from 'react-router-dom';

function Home() {
  const { searchPARAMS } = useParams();

  const [searchData, setSearch] = useState(searchPARAMS || "Travel");

  useEffect(() => {
    setSearch(searchPARAMS || "Travel");
  }, [searchPARAMS]);

  return (
    <>
      <Header  />
      <div className="mx-auto">
        <HamburgerMenu />
        <div className="ml-[160px]">
          <Category />
          <CardWrapper search={searchData}/>
        </div>
      </div>
    </>
  );
}

export default Home;
