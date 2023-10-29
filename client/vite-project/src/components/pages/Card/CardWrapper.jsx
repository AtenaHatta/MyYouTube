import Card from "./Card";
import React, { useEffect, useState } from "react";
import SkeltonWtapper from "../../layout/SkeltonWtapper";

function CardWrapper({ search }) {
  const [data, setData] = useState([]);
  const [chanel, setChanel] = useState("UCCbof2as-xl4HO2UopxdlOQ");
  const [loading, setLoading] = useState(true);

  const host = import.meta.env.VITE_HOST;
  const url = `${host}/youtube/search/${search}`;

  const fetchData = async () => {
    try {
      const response = await fetch(url);
      console.log(response.data);

      // if (!response.ok) {
      //   const message = `An error has occured: ${response.status}`;
      //   throw new Error(message);
      // }

      const data = await response.json();
      setData(data.items);
      setLoading(false);
    } catch (error) {
      console.error("Error:", error.message); // Logs the error message to console
    }
  };

  // https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics&id=YOUR_CHANNEL_ID&key=YOUR_API_KEY

  const apiKey = "AIzaSyD5v5r3S1RzzRlxtoH9dxvC9LADT9Quw-M";

  const fetchChannelById = async () => {
    try {
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics&id=${chanel}&key=${apiKey}`
      );
      console.log(response.data);

      if (!response.ok) {
        const message = `An error has occured: ${response.status}`;
        throw new Error(message);
      }

      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error("Error:", error.message); // Logs the error message to console
    }
  };

  useEffect(() => {
    fetchData();
    if (chanel.length > 0) {
      fetchChannelById();
    }
  }, [search, chanel]);

  return (
    <div className="text-white flex items-center justify-center mt-5">
      <div className="px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 justify-items-center">
          {data.map((item, index) => (
            <React.Fragment key={index}>
              <Card data={item} loading={loading} />
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CardWrapper;
