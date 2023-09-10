import React, { useState } from 'react';
import './PasswordField.css'; // Import the CSS file for styling

const PasswordField = ({setPassword}) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };
const[password,setpassword]=useState("")
const handlePassword=(e)=>{
  setpassword(e.target.value)
  setPassword(e.target.value)
}
  return (
    <div className="password-container">
      <div className="input-container">
        <input
          type={showPassword ? 'text' : 'password'}
          placeholder="Password"
          value={password}
          onChange={handlePassword}
        />
      </div>
      <div className="icon-containereye">
        <i
          className={`fa ${showPassword ? 'fa-eye' : 'fa-eye-slash'}`}
          onClick={handleTogglePassword}
        ></i>
      </div>
    </div>
  );
};

export default PasswordField;
