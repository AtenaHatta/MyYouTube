import Home from "./components/Home";
import React, { useEffect, useState } from "react";
import { Routes , Route } from "react-router-dom";
import Signin from "./components/userAuth/Signin";


function App() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [form, setForm] = useState("");
  const key = import.meta.env.VITE_YOUTUBE_APIKEY;

  useEffect(() => {
    fetch(
      `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=5&order=viewCount&q=${search}&key=${key}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    )
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((err) => console.log(err));
  }, [search]);

  function handleSubmit(e) {
    e.preventDefault();
    setSearch(form);
  }

  return (
    <>
      {/* <Home /> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<Signin />} />

      </Routes>
      
    </>
  );
}

export default App;



{/* <form onSubmit={handleSubmit}>
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
      ))} */}