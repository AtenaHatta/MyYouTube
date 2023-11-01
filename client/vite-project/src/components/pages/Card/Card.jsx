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
  const [subscribed, setSubscribed] = useState(null);

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

  const handleAddSubscribe = async () => {
    const body = {
      channelTitle: data.snippet.channelTitle,
      channelID: data.snippet.channelId,
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

    const response = await fetch(`${url}/user/subscribelist`, options);
    const result = await response.json();

    if (result.message === "You are now subscribed") {
      setSubscribed(true);
      toast.success("You are now subscribed");
    }
  };

  const handleRemoveFromSubscribeList = async () => {
    const body = {
      channelID: data.snippet.channelId,
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

    const response = await fetch(`${url}/user/subscribelist`, options);
    const result = await response.json();

    if (result.message === "You are now unsubscribed") {
      setSubscribed(false);
      toast.success("You are now unsubscribed");
    }
  };

  // Check Subscribe -------------------------------

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
    const checkWatchList = async () => {
      const body = {
        videoId: data?.id?.videoId,
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
    const checkSubribedList = async () => {
      const body = {
        chanelID: data?.snippet?.channelId,
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

      const response = await fetch(`${url}/user/checkSubribeList`, options);
      const result = await response.json();
      if (result.message === "You are already subscribed") {
        setSubscribed(true);
      }
    };
    const checkData = async () => {
      await checkWatchList();
      await checkSubribedList();
    };

    if (token) {
      checkData();
    }
  }, [data, token, watchLater, subscribed, url]);

  return (
    <div>
      {!data ? (
        <Skelton />
      ) : (
        <div className="cursor-pointer flex flex-col justify-center ">
          <img
            className={`youtubelogo w-full h-full rounded-lg  `}
            src={data.snippet.thumbnails.medium.url}
            alt="youtubelogo"
            onClick={handleOpen}
          />
          <div className="flex flex-wrap">
            <h3 className="">{data.snippet.title}</h3>
            <div className="flex items-center">
              <p className="text-gray-400">{data.snippet.channelTitle}</p>
              {!subscribed ? (
                <button
                  className="text-xs md:text-xs bg-slate-800 px-2 py-1 ml-2 rounded-full hover:text-red-500"
                  onClick={handleAddSubscribe}
                >
                  Subscribe
                </button>
              ) : (
                <button
                  className="text-xs md:text-xs bg-slate-800 px-2 py-1 ml-2 rounded-full hover:text-red-500"
                  onClick={handleRemoveFromSubscribeList}
                >
                  Unsubscribe
                </button>
              )}
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
