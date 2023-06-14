import youtube from '../../assets/youtube.webp';
import { VscAccount } from "react-icons/vsc";

function Card(){
return(
      <div>
        <img className="youtubelogo w-[350px] h-[200px] mr-1" src={youtube} alt="youtubelogo"/>
          <div className="flex items-center justify-start">
            <VscAccount className="w-10 h-10 text-2xl m-3 text-white" />
            <div>
              <h4>title</h4>
              <p>user name</p>
              <p>upload date</p>
              <p>watch later</p>
            </div>
          </div>
      </div>
  )
}

export default Card