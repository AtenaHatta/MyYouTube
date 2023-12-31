import { useEffect, useState } from "react";
import Loading from "../../layout/Loading";
import NoData from "../../layout/Nodata";

function SubscribeWrapper() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getSubscribeList = async () => {
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

    try {
      const response = await fetch(`${url}/youtube/subscribe`, options);
      if (!response.ok) {
        throw new Error("Network response was not ok" + response.statusText);
      }
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error("Error fetching subscribe list:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const unsubscribeChannel = async (channelID) => {
    const token = localStorage.getItem("token");
    const url = import.meta.env.VITE_HOST;
    const options = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({ channelID }),
    };

    const response = await fetch(`${url}/user/subscribelist`, options);
    console.log(response);
    if (response.ok) {
      setData((prevData) =>
        prevData.filter((channel) => channel.id !== channelID)
      );
    } else {
      console.error("Error unsubscribing from channel:", await response.text());
    }
  };

  useEffect(() => {
    getSubscribeList();
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  if (data.length === 0) {
    return <NoData message="You haven't subscribed to any channels yet" />;
  }

  return (
    <div className="text-white mx-10 mt-20 md:mt-40">
      <div className="px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-10">
        {data.map((channel, index) => (
          <div className="flex flex-col items-center" key={index}>
            <img
              className="w-20 h-20 rounded-full"
              src={channel.snippet.thumbnails.default.url}
              alt={channel.snippet.title}
            />
            <p className="text-xs md:text-base mt-3">{channel.snippet.title}</p>
            <p className="text-xs md:text-sm text-slate-400">
              {channel.snippet.customUrl}
            </p>
            <p className="text-xs md:text-sm text-slate-400">
              {channel.statistics.subscriberCount} Subscribers
            </p>
            <button
              className="text-xs md:text-xs font-bold mt-2 bg-slate-800 p-2 rounded-full text-blue-500 hover:text-red-600 before:content-['Subscribed'] hover:before:content-['Unsubscribe']"
              onClick={() => unsubscribeChannel(channel.id)}
            ></button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SubscribeWrapper;
