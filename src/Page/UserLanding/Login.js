import React, { useEffect, useState } from 'react'
import "./Login.css"
import PasswordField from "../../Component/PasswordField/PasswordField"
import { userLogin } from '../../APIintegrate/AllApi';
import { useSelector, useDispatch } from 'react-redux';
import { setData } from "../../redux/action/LoginAction";
import {
  useNavigate,
} from "react-router-dom"
export default function Login({setLogin_true}) {
  const dispatch=useDispatch()
  const navigate=useNavigate()
  const[show,setShow]=useState(true)
  const[registershow,setRegisterShow]=useState(false)
  const[forgetshow,setForgetShow]=useState(false)
  const handleLogin=()=>{
    setShow(true)
    setRegisterShow(false)
  }
  const handlePassword=()=>{
    navigate("/password-reset")
  }
  const handleRegisterView=()=>{
  navigate("/register")
  }
  const[email,setEmail]=useState("")
  const[password,setPassword]=useState("")
  const[IsLoggedIn,setIsLoggedIn]=useState(false)

  const[usererr,setUsererr]=useState("")
 

  const json=JSON.stringify({
    email:email,
   password:password
 })
 const handleSubmit=async()=>{
   try {
   let response = await userLogin(json)
     if(response){
      const token = response.data.token;
      // dispatch(setData(response.data.user_id))
      localStorage.setItem('token', token);
      setLogin_true(true)
      setIsLoggedIn(true)
     }
   }catch(err){

setUsererr(err.response.data.error);

   }
 }
  return (
  <body>

      <>
      <div className="containerlogin">
    <h2>Login</h2>
    <div className="form-group">
        <label for="email">Email:</label>
        <input type="email" id="email" name="email" required autocomplete="off" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
      </div>
      {/* <div className="form-group">
        <label for="password">Password:</label>
        <input type="password" id="password" name="password" className='inputpassword' required/>
      </div> */}
      <div className="form-group">
        <label for="password">Password:</label>
        <PasswordField setPassword={setPassword}/>
      </div>
      <span style={{color:"red"}}>{usererr}</span>
      <div className="form-group">
        <input type="submit" value="Login" onClick={handleSubmit}/>
      </div>
      <span>back to <span className='signin' onClick={handleRegisterView}>register</span> or </span> <span className='forgetpass' onClick={handlePassword}>Forget password</span>
    </div>
      </>
 
    </body>
  )
}
