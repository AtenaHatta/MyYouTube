import youtube from "../../assets/youtube.webp";
import { VscAccount } from "react-icons/vsc";

function Card({data}) {
  return (
    <div>
      <img
        className={`youtubelogo w-[${data.snippet.thumbnails.medium.width}px] h-[${data.snippet.thumbnails.medium.height}px] mr-1`}
        src={data.snippet.thumbnails.medium.url}
        alt="youtubelogo"
      />
      <div className="flex items-center justify-start">
       
        <div>
          <h4>{data.snippet.title}</h4>
          <p>{data.snippet.channelTitle}</p>
          <p>{data.snippet.publishTime}</p>
          <p>watch later</p>
        </div>
      </div>
    </div>
  );
}

export default Card;
