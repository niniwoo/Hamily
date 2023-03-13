import React, { useState } from "react";
import io from "socket.io-client";
import Navbar from './Navbar'

const socket = io("http://localhost:3005", { transports: ["websocket"] });

function Chat() {
const [inputValue, setInputValue] = useState("");
const [userName, setUserName] = useState("");

const [textArray, setTextArray] = useState([]);

function handleSubmit(e) {
e.preventDefault();
setUserName(socket.id);

console.log("Input Value: ", inputValue);

console.log("username: ", userName);

if (inputValue !== "") {
socket.emit("chat message", `\n${userName}: ${inputValue}`);
socket.on("chat message", (msg) => {
console.log("socket message: ", msg);
const emitArray = [...textArray, msg];
setTextArray(emitArray);
});

setInputValue("");
}
}
return (
  
<div className="App">
<Navbar />
<ul id="messages"></ul>
<form id="form" action="" onSubmit={handleSubmit}>
<input
id="input"
autoComplete="off"
value={inputValue}
onChange={(e) => setInputValue(e.target.value)}
/>
<button>Send</button>
</form>
<p>
{textArray.map((element, index) => {
return <li key={index}>{element}</li>;
})}
</p>
</div>
);
}

export default Chat;
