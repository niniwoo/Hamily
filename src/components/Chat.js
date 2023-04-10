import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import Navbar from "./Navbar";
import Banner from "./Banner";

const socket = io("http://localhost:3005", { transports: ["websocket"] });

function Chat() {
  const [inputValue, setInputValue] = useState("");
  const [userName, setUserName] = useState("");
  const [textArray, setTextArray] = useState([]);
  // const [time,setTime] = useState("");

  useEffect(() => {
    fetch("http://localhost:4000/question", {
      method: "POST",
      crossDomain: true,
      headers: {
        mode: "no-cors",
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        token: window.localStorage.getItem("token"),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setUserName(data.username);
      });
  }, []);

  useEffect(() => {
    socket.on("chat message", (msg) => {
      const messageObject = {
        text: msg,
        isCurrentUser: msg.startsWith(userName),
      };
      setTextArray([...textArray, messageObject]);
    });
    console.log("text array:", textArray);
  }, [textArray]);

  function handleSubmit(e) {
    e.preventDefault();
    
    // setTime(Date().slice(10,19));
    if (inputValue !== "") {
      socket.emit("chat message", `${userName}: ${inputValue}`);
      setInputValue("");
    }
  }

  return (
    <>
      <div className="container">
        <Banner />
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
        <ul className="messages">
          {textArray.map((message, index) => (
            <li
              key={index}
              className={message.isCurrentUser ? "sent" : "received"}
            >
              {message.text}
               {/* <span className="chat-time">{time}</span> */}
            </li>
          ))}
        </ul>
      </div>
       
        <Navbar />
      </div>
    </>
  );
}

export default Chat;
