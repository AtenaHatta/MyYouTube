import React, { useState, useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";
import { handleSaveWatchLater } from "./card.config";
import { toast } from "react-toastify";
import { formatISO9075 } from 'date-fns';


function Card({ data }) {
  const [isOpen, setIsOpen] = useState(false);
  const [watchLater, setWatchLater] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
  };
  const handleClose = () => {
    setIsOpen(false);
  };
  
  //watch later -------------------------------
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
    console.log(result);
    if (result.message === "Video is already in favorites") {
      setWatchLater(true);
    }
  };
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
    checkWatchList();
  }, []);
  // --------------------------------------------

  return (
    <div>
      <div onClick={handleOpen} className="cursor-pointer">
        <img
        className={`youtubelogo w-[400px] h-[100%] mr-1 rounded hover:rounded-none `}
          src={data.snippet.thumbnails.medium.url}
          alt="youtubelogo"
          width={400}
          height={200}
        />
        <div className="flex items-center justify-start">
          <div>
            <h3 className="text-lg">{data.snippet.title}</h3>
            <p className='text-gray-400'>{data.snippet.channelTitle}</p>
            <p className='text-gray-400 text-sm'>{formatISO9075(new Date(data.snippet.publishTime))}</p>
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
            ></div>
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
                {token ? (
                  !watchLater ? (
                    <button
                      type="button"
                      onClick={() => handleSaveWatchLater(data, setWatchLater)}
                      className="mt-3 w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                    >
                      Save to watch later
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={removeFromWachList}
                      className="mt-3 w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                    >
                      Remove from watch later
                    </button>
                  )
                ) : (
                  null
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Card;
