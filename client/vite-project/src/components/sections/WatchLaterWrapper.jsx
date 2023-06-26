import WatchLaterCard from "../pages/watchLaterCard";
import React, { useEffect, useState } from "react";

function WatchLaterWrapper() {
  const [data, setData] = useState([]);
  const [render , setRender] = useState(false);


  const getWatchList = async () => {
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
      setData(result.watchlist);
    console.log(result);
  };

    useEffect(() => {
        getWatchList();
    }, [render]);




  return (
    <div className="text-white flex items-center justify-center mt-5">
      <div className="px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
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
