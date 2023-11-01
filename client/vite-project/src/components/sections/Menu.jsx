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
            className="font-roboto-condensed w-full h-12 md:h-10 mr-1"
            src={youtubelogo}
            alt="youtubelogo"
          />
          <p className="hidden lg:block text-white text-2xl font-roboto">MyYouTube</p>
        </div>
        </Link>
      </div>
    </div>
  );
}

export default Menu;
