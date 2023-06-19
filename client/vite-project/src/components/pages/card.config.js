import { toast } from "react-toastify";
const token = localStorage.getItem("token");
const url = import.meta.env.VITE_HOST;

//Save video to watch later
export const handleSaveWatchLater = async (data, setWatchLater) => {
    const body = {
      videoId: data.id.videoId,
      title: data.snippet.title,
      description: data.snippet.description,
      thumbnail: data.snippet.thumbnails.medium.url,
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
      toast.success("Video added to favorites");
        setWatchLater(true);
    }else if (result.message === "Video is already in favorites") {
      toast.error("Video is already in favorites");
    }
  }
