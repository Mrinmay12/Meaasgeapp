import apiUrl from "../ApiAxios";

export const sendMessage=(json)=>apiUrl.post(`/api/user/sendmessage`,json)
export const getMessage=(messageId)=>apiUrl.get(`/api/user/recivemessage/${messageId}`)
export const addTwoUser=(data)=>apiUrl.post(`/api/user/useradd`,data)

export const userfriend=(userid)=>apiUrl.get(`/api/user/userfriend/${userid}`)
export const userProfile=(userid)=>apiUrl.get(`/api/user/userprofile/${userid}`)

export const userLogin=(data)=>apiUrl.post(`/api/user/login`,data)
export const userRegister=(data)=>apiUrl.post(`/api/user/newuser`,data)
export const verifyToken=(token)=>apiUrl.get('/api/user/verifytoken',{
    headers: {
      Authorization: token,
    },
  })

  export const getAlluser=()=>apiUrl.get('/api/user/getuser')