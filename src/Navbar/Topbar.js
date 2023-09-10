import React,{useState} from 'react'
import {
    useLocation,
    useNavigate  
  } from "react-router-dom";
  import '@fortawesome/fontawesome-free/css/all.css';
  import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
  import { faSearch,faSignOutAlt,faArrowLeft, faHome, faUserFriends, faUser} from '@fortawesome/free-solid-svg-icons';
  import "./Topbar.css";

// import LogoutModal from '../LogoutModel/LogoutModal';
export default function Topnavbar({setLogin_true}) {
  const navigation=useNavigate()
  const location = useLocation();
  //destructuring pathname from location
  const { pathname } = location;
  const splitLocation = pathname.split("/");
  const handleLogout = () => {
    localStorage.removeItem('token');
    setLogin_true(false);
  };
  const[Logoutshow,setLogoutshow]=useState(false)
  

  return (
    <div>
        
        <nav class="top-navbar">
    <ul class="nav-links">
    {/* <li><img src={logo} style={{height:"35px"}}/></li> */}
    <li  onClick={()=>navigation("/")}>{splitLocation[1]==="" ?<FontAwesomeIcon icon={faHome} style={{color:"black",height:"30px",width:"40px",cursor:"pointer"}}/>:<FontAwesomeIcon icon={faHome} style={{color:"gray",height:"30px",width:"40px",cursor:"pointer"}} />}</li>
    <li><a ><i ></i> </a></li>
     
    <li  onClick={()=>navigation("/users")}>{splitLocation[1]==="users" ?<FontAwesomeIcon icon={faUserFriends} style={{color:"black",height:"30px",width:"40px",cursor:"pointer"}}/>:<FontAwesomeIcon icon={faUserFriends} style={{color:"gray",height:"30px",width:"40px",cursor:"pointer"}} />}</li>
   
    {/* <li  onClick={()=>navigation("/profile")}>{splitLocation[1]==="profile" ?<FontAwesomeIcon icon={faUser} style={{color:"black",height:"30px",width:"40px",cursor:"pointer"}}/>:<FontAwesomeIcon icon={faUser} style={{color:"gray",height:"30px",width:"40px",cursor:"pointer"}} />}</li> */}
      
      <li><a ><i></i></a></li>
      <li><a ><i></i></a></li>
      <li  onClick={()=>navigation("/profile")}>{splitLocation[1]==="profile" ?<FontAwesomeIcon icon={faUser} style={{color:"black",height:"30px",width:"40px",cursor:"pointer"}}/>:<FontAwesomeIcon icon={faUser} style={{color:"gray",height:"30px",width:"40px",cursor:"pointer"}} />}</li>
      {/* <li style={{cursor:"pointer"}} onClick={()=>setLogoutshow(true)}><FontAwesomeIcon icon={faSignOutAlt} style={{color:"red",height:"20px",width:"30px",cursor:"pointer",paddingTop:"7px"}}/></li> */}
    </ul>
  </nav>
      
        {/* <LogoutModal Logoutshow={Logoutshow} setLogoutshow={setLogoutshow} setLogin_true={setLogin_true}/> */}
    </div>
  )
}
