import { useEffect, useState } from "react";

function SubscribeMenu({ isDrawerOpen }) {
  const [data, setData] = useState(null);

  const token = localStorage.getItem("token");


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
    if (!token) return;
    const getSubscribeList = async () => {
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
      }
    };
    getSubscribeList();
  }, [token, isDrawerOpen]);



  return (
    <div className="flow-root">
      <ul className="h-full max-h-[600px] overflow-y-auto mt-5">
        {!data && (
          <>
            {[...Array(10)].map((_, index) => (
              <li key={index} className="py-3 sm:py-4">
                <div className="flex items-center space-x-4 animate-pulse">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-gray-300 rounded-full dark:bg-gray-700"></div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="h-2 bg-gray-300 rounded dark:bg-gray-700 mb-1"></div>
                    <div className="h-2 bg-gray-300 rounded dark:bg-gray-700"></div>
                  </div>
                </div>
              </li>
            ))}
          </>
        )}

        {data?.map((channel, index) => (
          <li key={index} className="py-3 sm:py-4 relative group">
            <div className="flex items-center space-x-4 bg-black ">
              <div className="flex-shrink-0">
                <img
                  className="w-8 h-8 rounded-full"
                  src={channel.snippet.thumbnails.default.url}
                  alt={channel.snippet.title}
                />
              </div>
              <div className="flex-1 min-w-0 group-hover:opacity-0 transition-opacity duration-300">
                <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                  {channel.snippet.title}
                </p>
                <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                  {channel.snippet.customUrl}
                </p>
              </div>
              <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white"></div>
            </div>
            <div className="absolute top-0 left-0 flex items-center justify-center w-full h-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <button
                className="text-xs text-white md:text-xs bg-slate-800 p-2 rounded-full hover:text-red-500"
                onClick={() => unsubscribeChannel(channel.id)}
              >
                Unsubscribe
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SubscribeMenu;
