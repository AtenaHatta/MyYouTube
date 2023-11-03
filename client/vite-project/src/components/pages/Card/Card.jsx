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
  const [chanelImg, setChanelImg] = useState(null);

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

  useEffect(() => {
  const apikey = import.meta.env.VITE_YOUTUBE_APIKEY;
  const url5 = `https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics&id=${data?.snippet.channelId}&key=${apikey}`;
    const getSubscribers = async () => {
      const response = await fetch(url5);
      const result = await response.json();
      setChanelImg(result.items[0].snippet.thumbnails.default.url)
    };
    getSubscribers();

  }, [data]);


  return (
    <div className="relative">
      {!data ? (
        <Skelton />
      ) : (
        <div className="cursor-pointer flex flex-col justify-center">
          <img
            className="youtubelogo w-full h-[200px] rounded-xl hover:rounded-sm "
            src={data.snippet.thumbnails.medium.url}
            alt="youtubelogo"
            onClick={handleOpen}
          />
          <div className="flex gap-4 mt-3 ">
            <img
              className="w-12 h-full object-contain object-center rounded-full border-2 border-gray-700 "
              src={chanelImg}
              alt={data.snippet.title}
            />
            <div>
              <h3 className="text-md font-semibold">{data.snippet.title}</h3>
              <p className="text-gray-400 text-sm justify-between">
                {data.snippet.channelTitle}
              </p>
              <p className="text-gray-400 text-xs">
                {format(new Date(data.snippet.publishTime), "MMM d yyyy")}
              </p>
              <div className="absolute bottom-0 right-0">
                {!subscribed ? (
                  <button
                    className="font-bold text-xs md:text-md bg-slate-800 px-2 py-1 ml-2 rounded-full text-gray-300 hover:text-blue-500"
                    onClick={handleAddSubscribe}
                  >
                    Subscribe
                  </button>
                ) : (
                  <button
                    className="font-bold text-xs md:text-md bg-slate-800 px-2 py-1 ml-2 rounded-full text-blue-500 hover:text-gray-300"
                    onClick={handleRemoveFromSubscribeList}
                  >
                    Subscribed
                  </button>
                )}
              </div>
            </div>
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
