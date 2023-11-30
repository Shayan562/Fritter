import './App.css';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import React, { useEffect } from 'react';
import { Home } from './pages/Home';
import { Pages } from './pages/Pages';
import { Friends } from './pages/Friends';
import Profile from './pages/Profile';




function App() {
  useEffect(()=>{
    document.title="Fritter";
},[])
  return (
    <div>
         <BrowserRouter>
        <Routes> 
          <Route path="/home" element={<Home/>}/>
          <Route path="/" element={<Login/>}/>
          <Route path="/signup" element={<SignUp/>}/>
          <Route path="/profile" element={<Profile/>}/>
          <Route path="/pages" element={<Pages/>}/>
          <Route path="/friends" element={<Friends/>}/>
          <Route path="*" element={<h1>404 Not Found</h1>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
