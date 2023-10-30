import Card from "./Card";
import { useEffect, useState } from "react";

function CardWrapper({ search }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [chanel, setChanel] = useState("UCCbof2as-xl4HO2UopxdlOQ");

  const host = import.meta.env.VITE_HOST;
  const url = `${host}/youtube/search/${search}`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setData(data.items);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [search, url]);

  const apiKey = import.meta.env.VITE_YOUTUBE_APIKEY;

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
    if (chanel.length > 0) {
      fetchChannelById();
    }
  });

  return (
    <div className="text-white flex items-center justify-center mt-20 md:mt-40">
      <div className="px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 justify-items-center">
          {loading
            ? Array.from({ length: 10 }, (_, index) => <Card key={index} />)
            : data.map((item, index) => <Card key={index} data={item} />)}
        </div>
      </div>
    </div>
  );
}

export default CardWrapper;
