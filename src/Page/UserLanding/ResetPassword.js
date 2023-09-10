import React,{useState,useEffect} from 'react'

export default function ResetPassword() {
    const handleSubmit=()=>{
        alert("gg")
    }
  return (
    <div>
         <>
      <div className="containerlogin">
    <h2>Forget Password</h2>
    <div className="form-group">
        <label for="email">Email:</label>
        <input type="email" id="email" name="email" required autocomplete="off" placeholder="Email"/>
      </div>
      <div className="form-group">
        <input type="submit" value="Register" onClick={handleSubmit}/>
      </div>
      </div>
      </>
    </div>
  )
}
