import React,{useEffect,useState} from 'react'
import "./UserList.css"
import { getAlluser } from '../APIintegrate/AllApi'
import { useSelector, useDispatch } from 'react-redux';
import { addTwoUser ,userfriend} from '../APIintegrate/AllApi';
import { useNavigate } from 'react-router-dom';
export default function UserList() {
const[userlist,setUserList]=useState([]);
const userId=useSelector(state=>state.myReducer.data)
const[Status,setStatus]=useState("")
const navigate=useNavigate()
useEffect(()=>{
    const data=async()=>{
        try{
            const response=await getAlluser()
            if(response){
                let dataarray=Array.isArray(response.data.data)
                if(dataarray){
                    let data=response.data.data.filter((item)=>item.user_id !==userId)
                    setUserList(data)
                }
            }  
        }catch(err){
            console.log(err)
        }
  

    }
    data()
},[Status])

const[memberslist,setMemberlist]=useState([])
useEffect(()=>{
    const data=async()=>{
        try{
            const response=await userfriend(userId)
            if(response){
                let dataarray=Array.isArray(response.data.data)
                if(dataarray){
                    let data=response.data.data
                    let memberslist=data.map((item)=>item.members)
                    setMemberlist(memberslist);
               
                   
                }
            }  
        }catch(err){
            console.log(err)
        }
  

    }
    data()
},[Status])
console.log(memberslist,"memberslist");
// console.log(memberslist[0].includes("Mrinmay2.0lm250lct28u55"),"memberslist2");
console.log(userlist,userId);

const handleRequest=async(e)=>{
    const json=JSON.stringify({
        senderId:userId,
        receiverId:e
    })
    const response=await addTwoUser(json)
    if(response){
        setStatus(response.status);
        navigate("/message/"+response.data.data._id+"?userid="+window.btoa(e))
    }

}
  return (
    <>
  
     {userlist.map((item) => (
      <div class="user-card main-card"  key={item.user_id}>
        {/* <img src="user-image.jpg" alt="User Image" class="user-image">
         */}
         <div className='profileimg'></div>
        <div class="user-info">
            <h2 class="user-name">{item.name}</h2>
           
        </div>
        {!memberslist.some((members) => members.includes(item.user_id)) ? (
        <button class="message-button" onClick={() => handleRequest(item.user_id)}>Message</button>
        ) : null}
    </div>
 

     ))}
   </>
        /* <>
      {!memberslist.some((members) => members.includes(item.user_id)) ? (
      <div className="main-card" key={item.user_id}>
        <div className='userrequest'>
          <div className='profileimg'></div>
          <p className='username'>{item.name}</p>
         
            <div className='reqbutton' onClick={() => handleRequest(item.user_id)}>
            <p className='buttontext'>Message</p>
          </div>
         
        </div>
      </div>
        
          ) : null}
          </> */
        /* <div className="main-card" key={item.user_id}>
         <div className='userrequest'>
           <div className='profileimg'></div>
           <p className='username'>{item.name}</p>
           {!memberslist.some((members) => members.includes(item.user_id)) ? (
             <div className='reqbutton' onClick={() => handleRequest(item.user_id)}>
             <p className='buttontext'>Message</p>
           </div>
           ) : null}
           
         </div>
       </div> */
  )
}
