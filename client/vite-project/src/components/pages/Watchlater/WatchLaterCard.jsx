import { useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { WatchShowModal } from "./WatchShowModal";

function WatchLaterCard({ data, setRender }) {
  const [watchLater, setWatchLater] = useState(true);
  const [subscribe, setSubscribe] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const token = localStorage.getItem("token");
  const url = import.meta.env.VITE_HOST;

  const handleOpen = () => {
    setIsOpen(true);
  };
  const handleClose = () => {
    setIsOpen(false);
  };

  // Remove from Watch later -----------------
  const removeFromWachList = async () => {
    const body = {
      videoId: data.videoId,
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
      toast.success("Video removed from watchlist");
      setIsOpen(false);
      setRender((prev) => !prev);
    }
  };

  // Remove from Subscrivbe -----------------
  const removeFromSubscribeList = async () => {
    const body = {
      channelId: data.channelId,
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

    const response = await fetch(`${url}/user/checkSubscribeList`, options);
    const result = await response.json();

    if (result.message === "Video removed from Subscribe") {
      toast.success("Video removed from Subscribe");
      setIsOpen(false);
      setRender((prev) => !prev);
    }
  };

  return (
    <div>
      <div onClick={handleOpen}>
        <img
          className={`w-80 h-45 youtubelogo w-[${400}px] h-[${400}px] mr-1 rounded hover:rounded-none`}
          src={data.thumbnail}
          alt="youtubelogo"
        />
        <div className="flex items-center justify-start">
          <div>
            <h3 className="text-base">{data.title}</h3>
          </div>
        </div>
      </div>
      <WatchShowModal
        isOpen={isOpen}
        handleClose={handleClose}
        data={data}
        removeFromSubscribeList={removeFromSubscribeList}
        removeFromWachList={removeFromWachList}
        watchLater={watchLater}
        subscribe={subscribe}
      />
    </div>
  );
}

export default WatchLaterCard;
