import React from "react";
import "./Message.css";
import Input from "../InputArea/Input"
// import { format } from "timeago.js";

export default function Message({ message, own ,time}) {
  return (
    <div className={own ? "message own" : "message"}>
      <div className="messageTop">
    
        <p className="messageText">{message}</p>
      </div>
      <div className="messageBottom">{time?new Date(time).toDateString():new Date().toDateString()}</div>
      <Input/>
    </div>
  );
}