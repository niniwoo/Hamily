import React, { useState , useEffect, useContext } from "react";
import io from "socket.io-client";
import Navbar from './Navbar'
import Banner from "./Banner";
import { appContext } from "../providers/AppProvider";


const socket = io("http://localhost:3005", { transports: ["websocket"] });

function Chat() {

const [inputValue, setInputValue] = useState("");
const [userName, setUserName] = useState("");
const [textArray, setTextArray] = useState([]);
const [currentUserName, setCurrentUserName] = useState("");

useEffect(() => { 
    fetch("http://localhost:4000/question") 
    .then((response) => { 
        if (response.ok) { return response.json(); } 
        throw new Error("Network response was not ok."); }) 
        .then((data) => { 
            console.log("data", data); 
            setUserName(data.data.userName);
            setCurrentUserName(data.data.userName); // Set the current user name here
        }) 
        .catch((error) => {
             console.error("There was a problem with the fetch operation:", error); 
            });
}, []);

// useEffect(() => { 
//     fetch("http://localhost:4000/question") 
//     .then((response) => { 
//         if (response.ok) { return response.json(); } 
//         throw new Error("Network response was not ok."); }) 
//         .then((data) => { 
//             console.log("data", data); 
//             setUserName(data.data.userName);
          
//         }) 
//         .catch((error) => {
//              console.error("There was a problem with the fetch operation:", error); 
//             });
//          }, []);


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
socket.emit("chat message", `\n${userName} ${inputValue}`);


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
    // Add a CSS class based on whether the message is from the current user or not
    const className = element.includes(currentUserName) ? "message-right" : "message-left";
    return <li key={index} className={`chat-element ${className}`}>{element}</li>;
  })}
</p>
</div>
<Navbar />
</div>
  </>
);
}

export default Chat;
