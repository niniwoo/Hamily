import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import Navbar from './Navbar';

function Answer() {
  const [inputValue, setInputValue] = useState("");
  const [answer, setAnswer] = useState("");

  const location = useLocation();
  const question = location.state.question;
  const day = location.state.dayNumber;
  const month = location.state.monthNumber;

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setAnswer(inputValue);
    setInputValue("");
    fetch("/answers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        month:month,
        day:day,
        question:question,
        answer: inputValue,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "ok") {
          alert("Saved your answer!");
        } else {
          alert("Failed to save your answer.");
        }
      })
      .catch((error) => {
        alert("Error occurred while saving your answer.");
      });
  };
  

  return (
    <div className='container'>
      <p>Question of {month}/{day}: {question}</p>
      <form onSubmit={handleSubmit}>
        <label>
          Your answer:
          <input type="text" value={inputValue} onChange={handleInputChange}></input>
        </label>
        <button type="submit" className='answer-btn'>POST</button>
      </form>
      <p>{answer}</p>
      <Navbar />
    </div>
  );
}

export default Answer;
