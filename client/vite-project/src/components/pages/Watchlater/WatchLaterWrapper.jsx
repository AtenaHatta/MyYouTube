import WatchLaterCard from "./WatchLaterCard";
import React, { useEffect, useState } from "react";
import Loading from "../../layout/Loading";
import NoData from "../../layout/Nodata";

function WatchLaterWrapper() {
  const [data, setData] = useState([]);
  const [render , setRender] = useState(false);
  const [isLoading, setIsLoading] = useState(false);


  const getWatchList = async () => {
    setIsLoading(true);
    const token = localStorage.getItem("token");
    const url = import.meta.env.VITE_HOST;
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        "Access-Control-Allow-Origin": "*",
      },
    };

    const response = await fetch(`${url}/user/watchlistPage`, options);
    const result = await response.json();
    setIsLoading(false);
      setData(result.watchlist);
    console.log(result);
  };

    useEffect(() => {
        getWatchList();
    }, [render]);

    if (isLoading) {
      return <Loading />;
    }
  
    if (data.length === 0) {
      return <NoData  message="You haven't added anything to your watch later list yet" />;
    }

  return (
    <div className="text-white flex items-center justify-center mt-20 md:mt-40">
      <div className="px-4">
        <div className="grid grid-cols-1 smXl:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-7">
          {data?.length > 0 &&
            data.map((item, index) => (
              <React.Fragment key={index}>
                <WatchLaterCard data={item} setRender={setRender} />
              </React.Fragment>
            ))}
        </div>
      </div>
    </div>
  );
}

export default WatchLaterWrapper;
