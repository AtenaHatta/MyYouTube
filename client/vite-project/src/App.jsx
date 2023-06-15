import Home from "./components/Home";
import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Signin from "./components/userAuth/Signin";
import Signup from "./components/userAuth/Signup";

function App() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("travel");
  const [form, setForm] = useState("");

  const host = import.meta.env.VITE_HOST;
  const url = `${host}/youtube/search/${search}`;

  const fetchData = async () => {
    const response = await fetch(url);

    const data = await response.json();
    console.log(data);
    setData(data);
  };

  useEffect(() => {
    fetchData();
  }, [search]);

  return (
    <>
      {/* <Home /> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </>
  );
}

export default App;

{
  /* <form onSubmit={handleSubmit}>
        <input
          value={form}
          onChange={(e) => setForm(e.target.value)}
          placeholder="search video"
        />
        <button type="submit">submit</button>
      </form>

      {data?.items?.map((item, index) => (
        <React.Fragment key={index}>
          <iframe
            width="420"
            height="315"
            src={`https://www.youtube.com/embed/${item.id.videoId}`}
          ></iframe>
        </React.Fragment>
      ))} */
}
