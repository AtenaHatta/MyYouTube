import Card from "./Card";
import { useEffect, useState } from "react";

function CardWrapper({ search }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const host = import.meta.env.VITE_HOST;
  const url = `${host}/youtube/search/${search}`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
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


  if(!data) return null;
  const removeShorts = data.filter((item) => item.snippet.description !== '' && item.id.kind === 'youtube#video');

  return (
    <div className="text-white flex items-center justify-center mt-20 md:mt-40">
      <div className="px-4">
        <div className="grid grid-cols-1 smXl:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 justify-items-center">
          {loading
            ? Array.from({ length: 10 }, (_, index) => <Card key={index} />)
            : removeShorts.map((item, index) => <Card key={index} data={item} />)}
        </div>
      </div>
    </div>
  );
}

export default CardWrapper;
