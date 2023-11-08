import { toast } from "react-toastify";
const token = localStorage.getItem("token");
const url = import.meta.env.VITE_HOST;

export const handleSaveWatchLater = async (data, setWatchLater) => {
  const body = {
    videoId: data.id.videoId,
    title: data.snippet.title,
    description: data.snippet.description,
    thumbnail: data.snippet.thumbnails.medium.url,
    chanelTitle: data.snippet.channelTitle,
    chanelID: data.snippet.channelId,
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

  const response = await fetch(`${url}/user/watchlist`, options);
  const result = await response.json();
  console.log(result);

  if (result.message === "Video added to favorites") {
    toast.success("Video added to watchlist");
    setWatchLater(true);
  } else if (result.message === "Video is already in favorites") {
    toast.error("Video is already in watchlist");
  }
};

export const handleSaveToSubscribeList = async (data, setSubscribed) => {
  const body = {
    chanelTitle: data.snippet.channelTitle,
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
  console.log(result);

  if (result.message === "You are now subscribed") {
    toast.success("You are now subscribed");
    setSubscribed(true);
  } else if (result.message === "You are already subscribed") {
    toast.error("You are already subscribed");
  }
};

export const handleRemoveFromSubscribeList = async (data, setSubscribed) => {
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

export const removeFromWachList = async (data, setWatchLater) => {
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
