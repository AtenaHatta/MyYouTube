import { BiBell } from "react-icons/bi";
import MenuRightContents from "../pages/Dropdown/MenuRightContents";

export default function MenuAuth() {
  return (
    <div className="flex items-center">
      <BiBell className="w-5 h-5 text-white cursor-pointer" />
      <MenuRightContents />
    </div>
  );
}
