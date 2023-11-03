import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import CardWrapper from "./pages/Card/CardWrapper";

function Home() {
  const { searchPARAMS } = useParams();
  const [searchData, setSearch] = useState('youtube');

  useEffect(() => {
    setSearch(searchPARAMS || 'youtube');
  }, [searchPARAMS]);

  return (
    <>
      <div className="mx-auto mt-5 md:mt-24">
        
          <CardWrapper search={searchData} />
       
      </div>
    </>
  );
}

export default Home;
