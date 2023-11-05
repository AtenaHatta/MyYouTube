import nodataImage from "@/assets/nodata.webp";

const NoData = ({ message }) => {
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <div className="flex flex-col justify-center items-center">
        <img src={nodataImage} alt="No data" className="w-4/5 h-auto" />
      </div>
      <p className="text-md md:text-2xl text-white font-extralight italic">
        {message}
      </p>
    </div>
  );
};

export default NoData;
