import React, { Component, useMemo, useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useLocation,
  Navigate,
  useNavigate,
} from "react-router-dom";

import Login from "./Page/UserLanding/Login";
import Register from "./Page/UserLanding/Register"
import ResetPassword from "./Page/UserLanding/ResetPassword"
import Messagapage from "./Page/Messagepage";
import Topnavbar from "./Navbar/Topbar";
import { useSelector, useDispatch } from 'react-redux';
import { setData } from "./redux/action/LoginAction";

import apiUrl from "./ApiAxios"; 
import { verifyToken } from "./APIintegrate/AllApi";
import UserList from "./Page/UserList";
import Main from "./Page/Main";
import TopMessagebar from "./Navbar/TopMessagebar";
export default function AppRouters() {
  const dispatch = useDispatch();
  const location = useLocation();
    //destructuring pathname from location
    const { pathname } = location;
const navigate=useNavigate()
    //Javascript split method to get the name of the path in array
    const splitLocation = pathname.split("/");
    // const newData = { name: "mm", id: 23 };
    // useEffect(()=>{

    //   dispatch(setData(newData))
    // },[])
    let token= localStorage.getItem('token');
  const[login_true,setLogin_true]=useState(false)
  const [user,setUser]=useState(null)
  useEffect(()=>{
    if(token){
      setLogin_true(true)
    }
  },[token])

   useEffect(()=>{
if(user){

  dispatch(setData(user))
}
    },[user])
  useEffect(() => {
const data=async()=>{
  if (token) {
     try{
      let response=await verifyToken(token)
      if(response){
        setUser(response.data.user_id);
      }
     }catch(err){
      if(err.response.data.logout){
        localStorage.removeItem('token');
        setLogin_true(false)
      }
      console.log(err.response.data.logout);
     }
   
   }
}
     data()
        // .then((response) => response.json())
        // .then((data) => {
        //   setUser(data.user_id);
        // })
        // .catch((error) => {
        //   console.error('An error occurred:', error);
        // });
    
  }, [token]);
  useEffect(()=>{
if(!login_true){
  navigate("/login")
}else{
  navigate("/")
}
  },[login_true])
  return (
    <div>
    {!login_true?(

      <Routes>
        <Route path="/login" element={<Login setLogin_true={setLogin_true}/>} />
        <Route path="/register" element={<Register setLogin_true={setLogin_true}/>}/>
        <Route path="/password-reset" element={<ResetPassword/>}/>
       
      </Routes>
    ):(
      <>  
      <div style={{paddingTop:"51px",backgroundColor:"#80808000",paddingBottom:"70px"}}>
      <Routes>
      <Route path="/message/:id" element={<Messagapage/>}/>
      <Route path="/" element={<Main/>}/>
      <Route path="/users" element={<UserList/>}/>
              </Routes>
</div>


  <>
  { splitLocation[1]==="login"?(null):(
<>
{splitLocation[1]==="message"?(
null
):(

      <Topnavbar setLogin_true={setLogin_true}/>
)}
      </>
  )}
   
 
 </>
      </>
    )}
    
 


    </div>
  )
}

