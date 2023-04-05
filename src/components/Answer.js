import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import Navbar from './Navbar';
import Banner from './Banner';

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
    fetch("http://localhost:4000/answers", {
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
        console.log("data from the answer component", data);
        if (data.status === "ok") {
          alert("Saved your answer!");
          setAnswer(inputValue); // set answer state to show the answer below the form
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
      <Banner/>
      <p>Question of {month}/{day}: {question}</p>
      {answer === "" && ( // conditionally render the form
        <form onSubmit={handleSubmit}>
          <label>
            Your answer:
            <input type="text" value={inputValue} onChange={handleInputChange}></input>
          </label>
          <button type="submit" className='answer-btn'>POST</button>
        </form>
      )}
      {answer !== "" && <p>{answer}</p>} {/* render answer below the form */}
      <Navbar />
    </div>
  );
}


export default Answer;
