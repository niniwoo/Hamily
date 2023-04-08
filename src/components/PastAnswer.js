import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Banner from "./Banner.js";

export default function PastAnswer() {
  const [answers, setAnswers] = useState([]);
  const [showAnswer, setShowAnswer] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [groupedAnswers, setGroupedAnswers] = useState({});

  const handleClick = (answer) => {
    setSelectedAnswer(answer);
    setShowAnswer(true);
  }

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

  useEffect(() => {
    const groupedByQuestion = answers.reduce((acc, curr) => {
      if (curr.question in acc) {
        acc[curr.question].push(curr);
      } else {
        acc[curr.question] = [curr];
      }
      return acc;
    }, {});
    setGroupedAnswers(groupedByQuestion);
  }, [answers]);

  return (
    <>
      <div className="container">
        <Banner />
         <ul>
          {Object.keys(groupedAnswers).map((question) => (
             <li key={question} className="answer-list">
               <div className="past-answer" onClick={() => handleClick(question)}>
                 <p>{question}</p>
                 <ul>
                   {groupedAnswers[question].map((answer) => (
                     <li
                       key={answer._id}
                       onClick={() => handleClick(answer)}
                       className="answer-item"
                     >
                     </li>
                   ))}
                 </ul>
               </div>
             </li>
           ))}
         </ul>
        <Navbar />
       {showAnswer && (
  <div className="popup">
    <div className="popup-content">
      <button onClick={() => setShowAnswer(false)} className='close-btn'>x</button>

      <ul>
        {groupedAnswers[selectedAnswer].map((answer, index) => (
          <li key={answer._id} className="answer-item">
            {index === 0 && <p>{answer.question}</p>}
            <div className="answer-pop">
            <p>Username: {answer.username}</p>
            <p>Answer: {answer.answer}</p>
            </div>
           
          </li>
        ))}
      </ul>
    </div>
  </div>
)}


      </div>
    </>
  );
}

