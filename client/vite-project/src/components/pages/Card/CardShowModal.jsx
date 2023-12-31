import { useEffect } from "react";

export function CardShowModal({
  isOpen,
  handleClose,
  data,
  watchLater,
  removeFromWachList,
  token,
  handleSaveWatchLater,
  setWatchLater,
}) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <div>
      {isOpen && (
        <div
          className="fixed z-10 inset-0 overflow-y-auto m-2 md:mt-20"
          aria-labelledby="modal-title"
          role="dialog"
          aria-modal="true"
          onClick={handleClose}
        >
          <div
            className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="fixed inset-0 bg-gray-800 bg-opacity-75 transition-opacity"></div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen">
              &#8203;
            </span>
            <div className="inline-block align-bottom max-w-5xl bg-black rounded-lg text-left  shadow-xl transform transition-all sm:my-8 sm:align-middle ">
              <div className=" px-4 py-3">
                <div className="relative overflow-hidden w-full pt-[56.25%] ">
                  <iframe
                    className="absolute top-0 left-0 w-full h-full"
                    src={`https://www.youtube.com/embed/${data.id.videoId}`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    title="Embedded youtube"
                  />
                </div>
                <h1 className="text-lg">{data.snippet.title}</h1>
                <p className="text-sm">{data.snippet.description}</p>
              </div>
              <div className="bg-black px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
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
                      onClick={() => removeFromWachList(data, setWatchLater)}
                      className="mt-3 w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                    >
                      Remove from watch later
                    </button>
                  )
                ) : null}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
