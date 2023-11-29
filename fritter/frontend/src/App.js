import logo from './logo.svg';
import './App.css';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import { SignUp } from './pages/SignUp';
import { Home } from './pages/Home';
import { Login } from './pages/Login';


function App() {
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
