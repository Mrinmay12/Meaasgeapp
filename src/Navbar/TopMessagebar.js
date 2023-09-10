import React,{useState,useEffect} from 'react'
import {
    useLocation,
    useNavigate  
  } from "react-router-dom";
  import '@fortawesome/fontawesome-free/css/all.css';
  import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
  import { faSearch,faSignOutAlt,faArrowLeft, faHome, faUserFriends, faUser, faBackward} from '@fortawesome/free-solid-svg-icons';
  import "./Topbar.css";
import { userProfile } from '../APIintegrate/AllApi';

export default function TopMessagebar({}) {
    const navigation=useNavigate()
  let  userName= localStorage.getItem("username")
  console.log(userName,"userName");
  return (
    <div>
    
    <nav class="top-navbar">
<ul class="nav-links">
{/* <li><img src={logo} style={{height:"35px"}}/></li> */}
<li  onClick={()=>navigation("/")}><FontAwesomeIcon icon={faArrowLeft} style={{color:"black",height:"30px",width:"40px",cursor:"pointer"}}/></li>

{/* <li><a ><i ></i> </a></li> */}
{/* <li><a ><i></i></a></li> */}

<li  ><FontAwesomeIcon icon={faUser} style={{color:"black",height:"30px",width:"40px",cursor:"pointer"}}/><h3>{userName}</h3>  </li>


  <li><a ><i></i></a></li>
  <li  >  <p ></p></li>

</ul>
</nav>
  
    {/* <LogoutModal Logoutshow={Logoutshow} setLogoutshow={setLogoutshow} setLogin_true={setLogin_true}/> */}
</div>
  )
}
