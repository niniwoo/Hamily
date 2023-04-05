
import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Banner from "./Banner.js";

export default function PastAnswer() {
  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/answers")
      .then((res) => res.json())
      .then((data) => {
        console.log("answer userData: ", data);
        setAnswers(data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <div className="container">
        <Banner />
        Past Answer Component!
        <ul>
          {answers.map((answer) => (
            <li key={answer._id} className="answer-list">
             <div className="past-answer">
                {/* <p>Username: {answer.username}</p> */}
                <p>Date: {answer.month}/{answer.day}</p>
                <p>Question: {answer.question}</p>
                {/* <p>Answer: {answer.answer}</p> */}
            </div>
   
            </li>
          ))}
        </ul>
        <Navbar />
      </div>
    </>
  );
}

