import React, { useState, useRef, useEffect } from 'react';
import "./Input.css"
import '@fortawesome/fontawesome-free/css/all.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane} from '@fortawesome/free-solid-svg-icons';
import { sendMessage } from '../../APIintegrate/AllApi';
import { useParams,useSearchParams  } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { io } from "socket.io-client"
const AutoGrowTextarea = ({setMessage,id,setmessagedata,messagedata,setMessagestatus,socket}) => {
  const userId=useSelector(state=>state.myReducer.data)
  const [searchParams, setSearchParams] = useSearchParams();
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [currentChat, setCurrentChat] = useState(null);
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
  // useEffect(() => {
  //   arrivalMessage &&
  //     currentChat?.members.includes(arrivalMessage.sender) &&
  //     setmessagedata((prev) => [...prev, arrivalMessage]);
  // }, [arrivalMessage, currentChat]);

  // const socket = useRef();
  const userid = searchParams.get('userid');
  const textareaRef = useRef(null);
  const [text, setText] = useState('');   
  let connect_userId=window.atob(userid)
  const resizeTextarea = () => {
    const textarea = textareaRef.current;
    textarea.style.height = 'auto';
    textarea.style.height = `${textarea.scrollHeight}px`; // Auto-grow the height
  };

  // Event handler for textarea input changes
  const handleInputChange = (event) => {
    setText(event.target.value);
    setMessage(event.target.value)
  };

  // UseEffect to resize the textarea whenever the text changes
  useEffect(() => {
    resizeTextarea();
  }, [text]);
const json =JSON.stringify({
  messageId:id,
    sender:userId,
    messagetext:text
})
  const handlesend=async()=>{
    socket.current.emit("send-msg", {
      to: connect_userId,
      from: userId,
      messagetext:text,
    });
  let response= await sendMessage(json)  
  if(response.status===201){
    setMessagestatus(new Date().getMilliseconds())
    // setmessagedata([...messagedata,response.data])
    setText("")
  }
  //  socket.current.emit("sendMessage", {
  //   senderId: userId,
  //   receiverId:connect_userId,
  //   text: text,
  // });

  }
  console.log(connect_userId,"connect_userId");
  return (
    <div className="textarea-container">
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
  </div>
  );
};

export default AutoGrowTextarea;
