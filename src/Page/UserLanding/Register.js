import React,{useState,useEffect} from 'react'
import { userRegister } from '../../APIintegrate/AllApi'
import PasswordField from "../../Component/PasswordField/PasswordField"
import {
  useNavigate,
} from "react-router-dom"
export default function Register({setLogin_true}) {
  const navigate=useNavigate()
    const handleLogin=(e)=>{
      navigate("/login")
    }
    const[password,setPassword]=useState("")
    const[name,setName]=useState("")
    const[email,setEmail]=useState("")
    const[gender,setGender]=useState("")
    const[dob,setDob]=useState("")
    const json=JSON.stringify({
      email, 
      password,
       age:dob,
       name ,
       sex:gender
    })
    const handleSubmit=async(e)=>{
      try {
        let response = await userRegister(json)
          if(response){
           const token = response.data.token;
           // dispatch(setData(response.data.user_id))
           localStorage.setItem('token', token);
           setLogin_true(true)
           setIsLoggedIn(true)
          }
        }catch(err){
     console.log('====================================');
     console.log(err);
     console.log('====================================');
        }
    }
  return (
    <div>
           <div className="containerlogin">
    <h2>Registration Form</h2>

      <div className="form-group">
        <label for="name">Full name:</label>
        <input type="name" id="name" name="name" required autocomplete="off" placeholder="Enter name" value={name} onChange={(e)=>setName(e.target.value)}/>
      </div>
      <div className="form-group">
        <label for="email">Email:</label>
        <input type="email" id="email" name="email" required autocomplete="off" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
      </div>
     
      <div className="form-group">
        <label for="password">Password:</label>
        <PasswordField setPassword={setPassword}/>
      </div>
      <div className="form-group">
        <label for="password">Dob:</label>
        <input type="date" name="dto" max="2023-07-11" value={dob} onChange={(e)=>setDob(e.target.value)}/>
      </div>
      <div className="form-group">
        <label for="gender">Gender:</label>
        <select id="gender" name="gender" required value={gender} onChange={(e)=>setGender(e.target.value)}>
          <option value="">Select</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
      </div>
      <div className="form-group">
        <input type="submit" value="Register" onClick={handleSubmit}/>
      </div>
      <span>All ready register </span> <span className='signin' onClick={handleLogin}>sing in</span>
    </div>
    </div>
  )
}
