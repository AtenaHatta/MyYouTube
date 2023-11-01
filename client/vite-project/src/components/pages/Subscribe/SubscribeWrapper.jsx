import { useEffect, useState } from "react";
import Loading_gif from "@/../public/gifs/Loading_gif.gif";

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
        throw new Error("Network response was not ok " + response.statusText);
      }
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error("Error fetching subscribe list:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // remove Subscribe list ------------------------------
  const unsubscribeChannel = async (channelID) => {
    console.log(channelID);
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
      // Remove the unsubscribed channel from local state
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
    return (
      <img
        src={Loading_gif}
        alt="Loading..."
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-20 object-contain"
      />
    );
  }

  if (data.length === 0) {
    return (
      <p className="text-white mt-5 mx-10 text-center">No subscribe</p>
    );
  }

  return (
    <div className="text-white mx-10 mt-20 md:mt-40">
      <div className="px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-10">
          {data.map((channel, index) => (
            <div className="flex flex-col items-center" key={index}>
              <img
                className="w-20 h-20 rounded-full"
                src={channel.snippet.thumbnails.default.url}
                alt=""
              />
              <p className="text-xs md:text-base mt-3">
                {channel.snippet.title}
              </p>
              <p className="text-xs md:text-sm text-slate-400">
                {channel.snippet.customUrl}
              </p>
              <p className="text-xs md:text-sm text-slate-400">
                {channel.statistics.subscriberCount} Subscribers
              </p>
              <button
                className="text-xs md:text-xs mt-2 bg-slate-800 p-2 rounded-full hover:text-red-500"
                onClick={() => unsubscribeChannel(channel.id)}
              >
                Unsubscribe
              </button>
            </div>
          ))
        }
      </div>
    </div>
  );
}

export default SubscribeWrapper;
