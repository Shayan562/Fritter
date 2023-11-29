import './App.css';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import React, { useEffect } from 'react';
import { Home } from './pages/Home';




function App() {
  useEffect(()=>{
    document.title="Fritter";
},[])
  return (
    <div>
         <BrowserRouter>
        <Routes> 
          <Route path="/" element={<Home/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/signup" element={<SignUp/>}/>
          <Route path="*" element={<h1>404 Not Found</h1>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
