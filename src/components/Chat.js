import React, { useState , useEffect, useContext } from "react";
import io from "socket.io-client";
import Navbar from './Navbar'
import Banner from "./Banner";
import { appContext } from "../providers/AppProvider";


const socket = io("http://localhost:3005", { transports: ["websocket"] });

function Chat() {

// const {chatName} = useContext(appContext);
const [inputValue, setInputValue] = useState("");
const [userName, setUserName] = useState("");
const [textArray, setTextArray] = useState([]);

// useEffect(()=>{
//     setUserName(chatName);
// },[handleSubmit]);
useEffect(() => { 
    fetch("http://localhost:4000/question") 
    .then((response) => { 
        if (response.ok) { return response.json(); } 
        throw new Error("Network response was not ok."); }) 
        .then((data) => { 
            console.log("data", data); 
          
        }) 
        .catch((error) => {
             console.error("There was a problem with the fetch operation:", error); 
            });
         }, []);



useEffect(()=>{
    socket.on("chat message", (msg) => {
        setTextArray([...textArray,msg]);
        });
},[textArray]);

function handleSubmit(e) {
e.preventDefault();

console.log("Input Value: ", inputValue);
console.log("username: ", userName);



if (inputValue !== "") {
socket.emit("chat message", `\n${inputValue}`);


setInputValue("");
}
}
return (
  <>
  
  <div className="container">
    <Banner/>
<ul id="messages"></ul>
<form id="form" action="" onSubmit={handleSubmit} className="chat-form">
    <div className="inputbtn">
        <input
            id="input"
            autoComplete="off"
            value={inputValue}
onChange={(e) => setInputValue(e.target.value)}
/>
<button className="chat-btn">Send</button>
    </div>

</form>
<div className="msg-container">
     <p className="message">
    {textArray.map((element, index) => {
      return <li key={index} className="chat-element">{element}</li>;
    })}
</p>
</div>
   


<Navbar />
</div>
  </>


  
);
}

export default Chat;
