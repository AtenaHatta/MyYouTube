import youtubelogo from "../../assets/youtubelogo.png";
import { Link } from "react-router-dom";
import MenuLeftContents from "../pages/Dropdown/MenuLeftContents";

function Menu() {
  return (
    <div className="w-200 flex justify-between items-center">
      <div className="ml-auto">
        <MenuLeftContents />
      </div>
      <Link to="/">
        <div className="md:flex items-center w-full">
          <img
            className="block w-auto h-12 md:h-10 mr-1 flex-shrink-0"
            src={youtubelogo}
            alt="YouTube logo"
          />
          <p className="hidden lg:flex text-white text-2xl font-roboto">
            MyYouTube
          </p>
        </div>
      </Link>
    </div>
  );
}

export default Menu;
