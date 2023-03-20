import React, { useState } from "react";
import { useEffect } from "react";
import io from "socket.io-client";
import Navbar from './Navbar'

const socket = io("http://localhost:3005", { transports: ["websocket"] });

function Chat() {
const [inputValue, setInputValue] = useState("");
const [userName, setUserName] = useState("");

const [textArray, setTextArray] = useState([]);

useEffect(()=>{
    setUserName("test");
},[]);



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
socket.emit("chat message", `\n${userName}: ${inputValue}`);


setInputValue("");
}
}
return (
  
<div className="container">
<ul id="messages"></ul>
<form id="form" action="" onSubmit={handleSubmit}>
<input
id="input"
autoComplete="off"
value={inputValue}
onChange={(e) => setInputValue(e.target.value)}
/>
<button className="chat-btn">Send</button>
</form>
<p>
{textArray.map((element, index) => {
return <li key={index} className="chat-element">{element}</li>;
})}
</p>
<Navbar />
</div>
);
}

export default Chat;

// import React, { useEffect, useState } from "react";
// import io from "socket.io-client";

// const socket = io("http://localhost:3001", { transports: ["websocket"] });

// function Chat() {
// const [inputValue, setInputValue] = useState("");
// const [userName, setUserName] = useState("");

// const [textArray, setTextArray] = useState([]);

// useEffect(() => {
// setUserName("test");
// }, []);

// useEffect(() => {
// socket.on("chat message", (msg) => {
// setTextArray([...textArray, msg]);
// });
// }, [textArray]);

// function handleSubmit(e) {
// e.preventDefault();

// console.log("Input Value: ", inputValue);

// console.log("username: ", userName);

// if (inputValue !== "") {
// socket.emit("chat message", `\n${userName}: ${inputValue}`);
// setInputValue("");
// }
// }
// return (
//     <div className="App">
//     <ul id="messages"></ul>
//     <form id="form" action="" onSubmit={handleSubmit}>
//     <input
//     id="input"
//     autoComplete="off"
//     value={inputValue}
//     onChange={(e) => setInputValue(e.target.value)}
//     />
//     <button>Send</button>
//     </form>
//     <p>
//     {textArray.map((element, index) => 
//     {
//     return <li key={index}>{element}</li>;
//     })}
//     </p>
//     </div>
//     );
//     }
    
//     export default Chat;
