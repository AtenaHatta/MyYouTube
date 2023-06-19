import React, { useState } from "react";
import 'react-toastify/dist/ReactToastify.css';


function Card({ data }) {
  const [isOpen, setIsOpen] = useState(false);

  console.log(data);

  const handleOpen = () => {
    setIsOpen(true);
  };
  const handleClose = () => {
    setIsOpen(false);
  };

  // Save to watch later
  const handleSaveWatchLater = async () => {
    const token = localStorage.getItem("token");
    const url = import.meta.env.VITE_HOST;
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
    }else if (result.message === "Video is already in favorites") {
      toast.error("Video is already in favorites");
    }
  }


  return (
    <div>
      <div onClick={handleOpen}>
        <img
          className={`w-80 h-45 youtubelogo w-[${data.snippet.thumbnails.medium.width}px] h-[${data.snippet.thumbnails.medium.height}px] mr-1 rounded hover:rounded-none`}
          src={data.snippet.thumbnails.medium.url}
          alt="youtubelogo"
        />
        <div className="flex items-center justify-start">
          <div>
            <h3 className="text-lg">{data.snippet.title}</h3>
            <p>{data.snippet.channelTitle}</p>
            <p>{data.snippet.publishTime}</p>
            <p>watch later</p>
          </div>
        </div>
      </div>

      {/* Modal */}
      {isOpen && (
        <div
          className="fixed z-10 inset-0 overflow-y-auto"
          aria-labelledby="modal-title"
          role="dialog"
          aria-modal="true"
        >
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 bg-gray-800 bg-opacity-75 transition-opacity"
              aria-hidden="true"
            >

            </div>
            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <div className="inline-block align-bottom w-max bg-black rounded-lg text-left  shadow-xl transform transition-all sm:my-8 sm:align-middle md:w-min ">
              <div className="bg-black px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="video-responsive">
                  <iframe
                    width="853"
                    height="480"
                    src={`https://www.youtube.com/embed/${data.id.videoId}`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    title="Embedded youtube"
                  />
                </div>
                <h1 className="text-lg">{data.snippet.title}</h1>
                <p className="text-sm">{data.snippet.description}</p>
              </div>
              <div className="bg-black-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  onClick={handleClose}
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Close
                </button>
                <button
                  type="button"
                  onClick={handleSaveWatchLater}
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Watch Later
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default Card;
