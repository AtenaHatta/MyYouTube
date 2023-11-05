import loadingGif from "@/assets/loading.gif";

const Loading = () => {
  return (
    <img
      src={loadingGif}
      alt="Loading..."
      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-20 object-contain"
    />
  );
};

export default Loading;
