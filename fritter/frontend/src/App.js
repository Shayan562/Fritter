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
import { PageView } from "./pages/PageView";
import { Message } from "./pages/Message";

export const AppContext = createContext();

function App() {
  const [userDetails, setUserDetails] = useState({
    user_id: "",
    username: "",
    password: "",
    disp_img_link: "",
  });
  const [userid,setUserid]=useState('');
  const [token, setToken] = useState({ token: "" });
  useEffect(() => {
    document.title = "Fritter";
  }, []);
  const handleUserID=(userID)=>{
    setUserid(userID);
  }
  return (
    <div>
      <AppContext.Provider
        value={{ userDetails, setUserDetails, token, setToken }}
      >
        <BrowserRouter>
          <Routes>
            <Route path="/home" element={<Home userID={userid}/>} />
            <Route path="/" element={<Login setUserID={handleUserID}/>} />
            <Route path="/signup" element={<SignUp userID={userid}/>} />
            <Route path="/profile" element={<Profile userID={userid}/>} />
            <Route path="/pages" element={<Pages userID={userid}/>} />
            <Route path="/friends" element={<Friends userID={userid}/>} />
            <Route path="/pageid" element={<PageView userID={userid}/>} />
            <Route path="/message" element={<Message userID={userid}/>} />
            <Route path="*" element={<h1>404 Not Found</h1>} />
          </Routes>
        </BrowserRouter>
      </AppContext.Provider>
    </div>
  );
}

export default App;
