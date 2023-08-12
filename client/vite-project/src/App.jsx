import Home from "./components/Home";
import { Routes, Route } from "react-router-dom";
import Signin from "./components/userAuth/Signin";
import Signup from "./components/userAuth/Signup";

function App() {
  return (
    <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/:searchPARAMS" element={<Home />} />
    <Route path="/signin" element={<Signin />} />
    <Route path="/signup" element={<Signup />} />
  </Routes> 
  );
}

export default App;

