import SearchForm from "../pages/SearchForm";
import { VscAccount } from "react-icons/vsc";
import { BiBell } from "react-icons/bi";


function Header(){
return(
    <header className="m-1">
        <div className="container mx-auto my-8">
          <SearchForm />
        </div>
        <div className="flex justify-end">
          <BiBell className="w-5 h-5 text-2xl text-white m-5"/>
          <VscAccount className="w-5 h-5 text-2xl text-white m-5" />
        </div>
    </header>
  )
}

export default Header