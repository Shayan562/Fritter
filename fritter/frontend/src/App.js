import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import React, { useEffect } from "react";
import { Home } from "./pages/Home";
import Profile from "./pages/Profile";
import Friends from "./pages/Friends";
import Pages from "./pages/Pages";
import { useState, createContext } from "react";

export const AppContext = createContext();

function App() {
  const [userDetails, setUserDetails] = useState({
    user_id: "",
    username: "",
    password: "",
    disp_img_link: "",
  });
  const [token, setToken] = useState({ token: "" });
  useEffect(() => {
    document.title = "Fritter";
  }, []);
  return (
    <div>
      <AppContext.Provider
        value={{ userDetails, setUserDetails, token, setToken }}
      >
        <BrowserRouter>
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/pages" element={<Pages />} />
            <Route path="/friends" element={<Friends />} />
            <Route path="*" element={<h1>404 Not Found</h1>} />
          </Routes>
        </BrowserRouter>
      </AppContext.Provider>
    </div>
  );
}

export default App;
