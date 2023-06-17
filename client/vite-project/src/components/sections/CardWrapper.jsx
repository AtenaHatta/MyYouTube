import Card from "../pages/Card";
import React, { useEffect, useState } from "react";

function CardWrapper({ search }) {
  const [data, setData] = useState([]);

  const host = import.meta.env.VITE_HOST;
  const url = `${host}/youtube/search/${search}`;

  const fetchData = async () => {
    try {
      const response = await fetch(url);

      if (!response.ok) {
        const message = `An error has occured: ${response.status}`;
        throw new Error(message);
      }

      const data = await response.json();
      setData(data.items);
    } catch (error) {
      console.error("Error:", error.message); // Logs the error message to console
    }
  };

  console.log(data);

  useEffect(() => {
    fetchData();
  }, [search]);

  return (
    <div className="text-white flex items-center justify-center mt-7">
      <div className="px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {data?.length > 0 &&
            data.map((item, index) => (
              <React.Fragment key={index}>
                <Card data={item} />
              </React.Fragment>
            ))}
        </div>
      </div>
    </div>
  );
}

export default CardWrapper;
