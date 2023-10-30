import youtubelogo from "../../assets/youtubelogo.png";
import { Link } from "react-router-dom";
import MenuLeftContents from "../pages/Dropdown/MenuLeftContents"

function Menu() {

  return (
    <div className="w-200">
      <div className="flex justify-between items-center">
        <div className="ml-auto">
          <MenuLeftContents />
        </div>
        <Link to="/">
        <div className="md:flex items-center">
          <img
            className="youtubelogo md:w-10 md:h-10 xs:w-12 xs:h-12 mr-1"
            src={youtubelogo}
            alt="youtubelogo"
          />
          <p className="hidden md:block text-white text-xl">MyYouTube</p>
        </div>
        </Link>
      </div>
    </div>
  );
}

export default Menu;
