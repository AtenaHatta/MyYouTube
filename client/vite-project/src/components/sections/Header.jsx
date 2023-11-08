import SearchForm from "./SearchForm";
import Menu from "./Menu";
import MenuAuth from "./MenuAuth";
import Category from "./Category";

function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 bg-black z-50">
      <div className="flex justify-center items-center md:ml-10 xs:ml-2">
        <Menu />
        <SearchForm />
        <div className="hidden md:flex justify-end items-center md:mr-10 xs:mr-0">
          <MenuAuth />
        </div>
      </div>
      <Category />
    </header>
  );
}

export default Header;
