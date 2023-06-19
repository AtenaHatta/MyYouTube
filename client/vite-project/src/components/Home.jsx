import { useState, useEffect } from "react";
import Header from "./sections/Header";
import Category from "./sections/Category";
import HamburgerMenu from "./sections/HamburgerMenu";
import CardWrapper from "./sections/CardWrapper";
import FavWrapper from "./sections/FavWrapper";

import { useParams } from "react-router-dom";

function Home() {
  const { searchPARAMS } = useParams();
  const [showFav, setShowFav] = useState(false);

  const [searchData, setSearch] = useState(searchPARAMS || "Travel");

  useEffect(() => {
    setSearch(searchPARAMS || "Travel");
  }, [searchPARAMS]);

  return (
    <>
      <Header />
      <div className="mx-auto">
        <HamburgerMenu setShowFav={setShowFav} />
        <div className="ml-[100px]">
          <Category />

          {showFav ? <FavWrapper /> : <CardWrapper search={searchData} />}
        </div>
      </div>
    </>
  );
}

export default Home;
