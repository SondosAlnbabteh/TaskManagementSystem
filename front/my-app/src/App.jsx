import Login from "../src/pages/Login";
import Register from "./pages/Register";
import Header from "./pages/Header";
import AddTasks from "./pages/AddTasks";
import Tasks from "./pages/Tasks";

import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Home from "./pages";

function App() {


  return (
    <div> 
    <BrowserRouter> 
     <Header/>
  
    <Routes>

    <Route path="/" element={<Home />}/>
    <Route path="/Login" element={<Login />}/>
    <Route path="/Register" element={<Register />}/>
    <Route path="/AddTasks" element={<AddTasks />}/>
    <Route path="/Tasks" element={<Tasks />}/>


  
  
    </Routes>
    </BrowserRouter>
    
    </div>
  )
}

export default App;
