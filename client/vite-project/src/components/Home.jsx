import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Header from "./sections/Header";
import Category from "./sections/Category";
import HamburgerMenu from "./sections/HamburgerMenu";
import CardWrapper from "./pages/Card/CardWrapper";
import WatchLaterWrapper from "./pages/Watchlater/WatchLaterWrapper";
import SubscribeWrapper from "./pages/Subscribe/SubscribeWrapper";

function Home() {
  const { searchPARAMS } = useParams();
  const [showFav, setShowFav] = useState(false);
  const [showSub, setShowSub] = useState(false);
  const [searchData, setSearch] = useState(searchPARAMS || "Travel");

  useEffect(() => {
    setSearch(searchPARAMS || "Travel");
  }, [searchPARAMS]);

  return (
    <>
      <Header />
      <div className="mx-auto">
        <HamburgerMenu showFav={showFav} setShowFav={setShowFav} showSub={showSub} setShowSub={setShowSub}/>
        <div className="md:ml-[150px] sm:ml-0">
          <Category />
          {showFav ? (
            <WatchLaterWrapper />
          ) : showSub ? (
            <SubscribeWrapper />
          ) : (
            <CardWrapper search={searchData} />
          )}
        </div>
      </div>
    </>
  );
}

export default Home;
