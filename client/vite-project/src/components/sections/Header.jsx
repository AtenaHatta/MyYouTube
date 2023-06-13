import SearchForm from "../pages/SearchForm";

function Header(){
return(
    <>
        <div>logo</div>
        <div className="container mx-auto my-8">
          <SearchForm />
        </div>
        <div>account</div>
    </>
  )
}

export default Header