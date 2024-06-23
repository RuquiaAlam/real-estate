import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Profile from "./pages/Profile";
import SignIn from "./pages/SignIn";
import SignOut from "./pages/SignOut";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/home" element={<Home />} />

        <Route path="/about" element={<About />} />
        <Route path="profile" element={<Profile />} />
        <Route path="/signin" elenent={<SignIn />} />
        <Route path="/signout" elenent={<SignOut />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
