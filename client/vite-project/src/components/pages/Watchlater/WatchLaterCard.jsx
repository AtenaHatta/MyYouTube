import { useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { WatchShowModal } from "./WatchShowModal";

function WatchLaterCard({ data, setRender }) {
  const [watchLater, setWatchLater] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const token = localStorage.getItem("token");
  const url = import.meta.env.VITE_HOST;

  const handleOpen = () => {
    setIsOpen(true);
  };
  const handleClose = () => {
    setIsOpen(false);
  };

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

    // setWatchLater(false);

    const response = await fetch(`${url}/user/checkWatchList`, options);
    const result = await response.json();

    if (result.message === "Video removed from watchlist") {
      toast.success("Video removed from watchlist");
      setIsOpen(false);
      setRender((prev) => !prev);
    }
  };

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
    <>
      <div
        onClick={handleOpen}
        className="w-full h-full  flex flex-col gap-3 cursor-pointer"
      >
        <img
          className={`w-full h-full  sm:h-56 object-cover rounded hover:rounded-none`}
          src={data.thumbnail}
          alt="youtubelogo"
        />
        <h3>{data.title}</h3>
      </div>

      <WatchShowModal
        isOpen={isOpen}
        handleClose={handleClose}
        data={data}
        removeFromSubscribeList={removeFromSubscribeList}
        removeFromWachList={removeFromWachList}
        watchLater={watchLater}
      />
    </>
  );
}

export default WatchLaterCard;
