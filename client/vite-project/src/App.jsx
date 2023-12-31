import Home from "./components/Home";
import { Routes, Route } from "react-router-dom";
import Signin from "./components/userAuth/Signin";
import Signup from "./components/userAuth/Signup";
import SubscribeWrapper from "./components/pages/Subscribe/SubscribeWrapper";
import Header from "./components/sections/Header";
import WatchLaterWrapper from "./components/pages/Watchlater/WatchLaterWrapper";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:searchPARAMS" element={<Home />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/subscribe" element={<SubscribeWrapper />} />
        <Route path="/watchLater" element={<WatchLaterWrapper />} />
      </Routes>
    </>
  );
}

export default App;
