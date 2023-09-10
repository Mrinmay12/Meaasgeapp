import React, { useState, useEffect } from 'react';
import { userfriend, userProfile } from '../APIintegrate/AllApi';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
export default function Main() {
    const navigate=useNavigate()
  const userId = useSelector((state) => state.myReducer.data);
  const [memberslist, setMemberlist] = useState([]);
  const [userProfiles, setUserProfiles] = useState({});

  useEffect(() => {
    const data = async () => {
      try {
        const response = await userfriend(userId);
        if (response) {
          let dataarray = Array.isArray(response.data.data);
          if (dataarray) {
            let data = response.data.data;
            setMemberlist(data);
          }
        }
      } catch (err) {
        console.log(err);
      }
    };

    if (userId !== null) {
      data();
    }
  }, [userId]);

  useEffect(() => {
    const fetchUserProfile = async (memberId) => {
      try {
        // Make the API call to userProfile with memberId
        const userResponse = await userProfile(memberId);
        if (userResponse) {
          // Store the user profile data in userProfiles state using memberId as the key
          setUserProfiles((prevProfiles) => ({
            ...prevProfiles,
            [memberId]: userResponse.data.user_details,
          }));
        }
      } catch (err) {
        console.log(err);
      }
    };

    // Loop through memberslist and fetch user profile for each member
    memberslist.forEach((item) => {
      const memberId = item.members?.find((item) => item !== userId);
      if (memberId) {
        fetchUserProfile(memberId);
      }
    });
  }, [memberslist, userId]);

  console.log(memberslist,userProfiles);
  const handleMesage=(e,id)=>{
    navigate("/message/"+e+"?userid="+window.btoa(id))
  }
  return (
    <div>
    {memberslist.length===0?<h1 style={{paddingTop:"181px"}}>You not connect your friends</h1>:(
        <>

      {memberslist.map((item) => (
        <div className="main-card user-card" key={item._id} onClick={()=>handleMesage(item._id,item.members?.filter((item) => item !== userId).toString())} style={{cursor:"pointer"}}>
        <div className='profileimg'></div>
        {userProfiles[item.members?.find((item) => item !== userId)] && (
        <div class="user-info">
        <p class="user-name">{userProfiles[item.members?.find((item) => item !== userId)].name}</p>   
        </div>
        )}
         
        </div>
      ))}
        </>
    )}
    </div>
  );
}
