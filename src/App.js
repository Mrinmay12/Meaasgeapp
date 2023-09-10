import React,{useEffect,useState,useRef} from 'react';
import logo from './logo.svg';
import './App.css';
import Messagepage from './Page/Messagepage';
import AppRouters from './AppRoutes';
import {
  BrowserRouter ,
  Routes,
  Route,
  Link,
  useLocation,
  Navigate,
} from "react-router-dom";
function App() {
 
  return (
    <div className="App">
    <BrowserRouter>
   <AppRouters/>
   </BrowserRouter>
    </div>
  );
}

export default App;
