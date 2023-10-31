import { useState, useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";
// import { handleSaveWatchLater, handleSaveToSubscribeList } from "./card.config";
import { toast } from "react-toastify";
import { format } from "date-fns";
import { CardShowModal } from "./CardShowModal";
import Skelton from "../../layout/Skelton";

function Card({ data }) {
  const [isOpen, setIsOpen] = useState(false);
  const [watchLater, setWatchLater] = useState(false);

  // ShowModal
  const handleOpen = () => {
    setIsOpen(true);
  };
  const handleClose = () => {
    setIsOpen(false);
  };

  // Check watch later -------------------------------
  const token = localStorage.getItem("token");
  const url = import.meta.env.VITE_HOST;

  const checkWatchList = async () => {
    const body = {
      videoId: data.id.videoId,
    };
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(body),
    };

    const response = await fetch(`${url}/user/checkWatchList`, options);
    const result = await response.json();

    if (result.message === "Video is already in favorites") {
      setWatchLater(true);
    }
  };

  //Check Subscribe -------------------------------
  // const checkSubribedList = async () => {
  //   const body = {
  //     chanelID: data.snippet.channelId,
  //   };
  //   const options = {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: `Bearer ${token}`,
  //       "Access-Control-Allow-Origin": "*",
  //     },
  //     body: JSON.stringify(body),
  //   };

  //   const response = await fetch(`${url}/user/checkSubribeList`, options);
  //   const result = await response.json();
  //   if (result.message === "You are already subscribed") {
  //     setSubscribed(true);
  //   }
  // };

  // remove Watch later list ------------------------------
  const removeFromWachList = async () => {
    const body = {
      videoId: data.id.videoId,
    };
    const options = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(body),
    };

    const response = await fetch(`${url}/user/checkWatchList`, options);
    const result = await response.json();

    if (result.message === "Video removed from watchlist") {
      setWatchLater(false);
      toast.success("Video removed from watchlist");
    }
  };

  useEffect(() => {
    const checkData = async () => {
      await checkWatchList();
      // await checkSubribedList();
    };

    if (token) {
      checkData();
    }
  }, [isOpen]);

  return (
    <div>
      {!data ? (
        <Skelton />
      ) : (
        <div
          onClick={handleOpen}
          className="cursor-pointer flex flex-col justify-center "
        >
          <img
            className={`youtubelogo w-full h-full rounded-lg  `}
            src={data.snippet.thumbnails.medium.url}
            alt="youtubelogo"
          />
          <div className="flex flex-wrap">
          
            <h3 className="">{data.snippet.title}</h3>
            <div className="flex items-center">
              <p className="text-gray-400">{data.snippet.channelTitle}</p>
              <button
                className="text-xs md:text-xs bg-slate-800 px-2 py-1 ml-2 rounded-full hover:text-red-500"
                // onClick={() => unsubscribeChannel(channel.id)}
              >
                Subscribe
              </button>
            </div>
            <p className="text-gray-400 text-sm">
              {format(new Date(data.snippet.publishTime), "MMM d yyyy")}
            </p>
          </div>
        </div>
      )}

      <CardShowModal
        isOpen={isOpen}
        handleClose={handleClose}
        data={data}
        watchLater={watchLater}
        removeFromWachList={removeFromWachList}
        token={token}
      />
    </div>
  );
}

export default Card;
