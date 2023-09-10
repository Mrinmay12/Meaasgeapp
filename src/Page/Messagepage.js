import React,{useEffect,useState,useRef} from 'react';
import { io } from "socket.io-client"
import Input from "../Component/InputArea/Input"
import Message from '../Component/Message/Message'
import "./Message.css"
import { getMessage, userProfile ,sendMessage} from '../APIintegrate/AllApi';
import { useSelector, useDispatch } from 'react-redux';
import { useParams,useSearchParams  } from 'react-router-dom';
import TopMessagebar from '../Navbar/TopMessagebar';

import '@fortawesome/fontawesome-free/css/all.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane} from '@fortawesome/free-solid-svg-icons';
export default function Messagepage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const userid = searchParams.get('userid');
  let { id } = useParams();
  let connect_userId=window.atob(userid)
  console.log(id,connect_userId);
  const userId=useSelector(state=>state.myReducer.data)
    const socket = useRef();
    const scrollRef=useRef()
    const[message,setMessage]=useState("")
    const [arrivalMessage, setArrivalMessage] = useState(null);
    const [currentChat, setCurrentChat] = useState(null);
    useEffect(() => {
      if (userId) {
        socket.current = io("https://messageapp-c9mf.onrender.com");
        socket.current.emit("add-user", userId);
      }
    }, [userId]);
    // useEffect(() => {
    //   socket.current = io("ws://localhost:9000");
    //   socket.current.on("getMessage", (data) => {
    //     setArrivalMessage({
    //       sender: data.senderId,
    //       text: data.text,
    //       createdAt: Date.now(),
    //     });
    //   });
    // }, []);
    const[messagedata,setmessagedata]=useState([])
    const[Messagestatus,setMessagestatus]=useState("")
    useEffect(()=>{
        const Messageget=async()=>{
            let message=await getMessage(id)
            if(message){
                setmessagedata(message.data.message
                    )
            }
        }
        Messageget()
    },[Messagestatus])

    useEffect(() => {
      if (socket.current) {
        socket.current.on("msg-recieve", (messagetext) => {
          setArrivalMessage({ fromSelf: false, messagetext: messagetext });
        });
      }
    }, []);
  

    useEffect(() => {
      arrivalMessage && setmessagedata((prev) => [...prev, arrivalMessage]);
    }, [arrivalMessage]); 
    // useEffect(() => {
    //     arrivalMessage &&
    //       currentChat?.members.includes(arrivalMessage.sender) &&
    //       setmessagedata((prev) => [...prev, arrivalMessage]);
    //   }, [arrivalMessage, currentChat]);
    
      // useEffect(() => { 
      //   socket.current.emit("addUser",userId);
      //   socket.current.on("getUsers", (users) => {
      //    console.log(users,"myUsers");
      //   });
      // }, [userId]);
    useEffect(() => {
      window.scrollTo(0,document.body.scrollHeight)
        scrollRef.current?.scrollIntoView({ behavior: "smooth" });
      }, [messagedata,Messagestatus]);
    console.log('====================================');
    // console.log(arrivalMessage);
    console.log(message);
    console.log('====================================');
console.log(userId,"this is my id ");

const[userName,setUsername]=useState("")
    useEffect(() => {
        const fetchUserProfile = async (connect_userId) => {
          try {
     
            const userResponse = await userProfile(connect_userId);
            if (userResponse) {
              console.log(userResponse.data.user_details,"userResponse.data.user_details");
                setUsername(userResponse.data.user_details.name);
            }
          } catch (err) {
            console.log(err);
          }
        };
    
          if (connect_userId) {
            fetchUserProfile(connect_userId);
          }
   
      }, [connect_userId]);
      localStorage.setItem("username",userName)
      console.log(userName,"myuserName");


      //Input data
      const textareaRef = useRef(null);
      const [text, setText] = useState('');   
    
      // const resizeTextarea = () => {
      //   const textarea = textareaRef.current;
      //   textarea.style.height = 'auto';
      //   textarea.style.height = `${textarea.scrollHeight}px`; // Auto-grow the height
      // };
    
      // Event handler for textarea input changes
      // const handleInputChange = (event) => {
      //   setText(event.target.value);
      //   setMessage(event.target.value)
      // };
    
      // UseEffect to resize the textarea whenever the text changes
      // useEffect(() => {
      //   resizeTextarea();
      // }, [text]);
    // const json =JSON.stringify({
    //   messageId:id,
    //     sender:userId,  
    //     messagetext:text
    // })
    //   const handlesend=async()=>{
    //     socket.current.emit("sendMessage", {
    //       senderId: userId,
    //       receiverId:connect_userId,
    //       text: text,
    //     });
    //     try{
    //       let response= await sendMessage(json)  
    //       if(response.status===201){
    //         setMessagestatus(new Date().getMilliseconds())
    //         // setmessagedata([...messagedata,response.data])
    //         setText("")
    //       }
    //     }catch(err){
    //       console.log(err);
    //     }
     
       
    // }
    
  return (
    <div>
    <TopMessagebar/>
        <div>
        <div class="comment-main-box">
      <div class="">
      {messagedata.map((item)=>(
        <Message own={item.sender===userId?true:false} message={item.messagetext} time={item.updatedAt
}/>
   ))}
    </div>
    </div>
        </div>
        <div className='autogrowstart'>
<Input setMessage={setMessage} id={id} userId={userId} setmessagedata={setmessagedata} messagedata={messagedata} setMessagestatus={setMessagestatus} socket={socket}/>
{/* <div className="textarea-container">
    <div className="textarea-wrapper">
      <textarea
        ref={textareaRef}
        rows="1"
        placeholder="Type your comment here..."
        value={text}
        onChange={handleInputChange}
        style={{ height: '50px' }}
      ></textarea>
    </div>
    <div className="autoicon-container">
      <FontAwesomeIcon
        icon={faPaperPlane}
        style={{ color: 'white', height: '19px', width: '24px', cursor: 'pointer' }}
        onClick={handlesend}
      />
    </div>
  </div> */}
</div>
    </div>
  )
}
