import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Navbar from './Navbar';
import Banner from './Banner';
import icon from '../css/img/love-letter.png';

function Answer() {
  const [inputValue, setInputValue] = useState("");
  const [answer, setAnswer] = useState("");
  const [userName, setUserName] = useState("");
  const location = useLocation();
  const question = location.state.question;
  const day = location.state.dayNumber;
  const month = location.state.monthNumber;

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  useEffect(() => {
    fetch("http://localhost:4000/question",{
      method:"POST",
      crossDomain:true,
      headers:{
        mode:'no-cors',
        "Content-Type":"application/json",
        Accept:"application/json",
        "Access-Control-Allow-Origin":"*",
      },
      body:JSON.stringify({
        token: window.localStorage.getItem("token"),
      }),
  }).then((res) => res.json())
    .then((data) => {
        console.log("answer userData: ", data);
        setUserName(data?.data?.username);
    })
    .catch((error) => {
        console.log(error);
    }); 
  }, [userName])


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
        username: userName,
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
<div className='question-container'>
        <div className='question-info'>
          <br/>
            <h3>Question of {month}/{day}:</h3>
        
        </div>

      <img src={icon} alt='letter-icon' className='letter-icon'></img>
      <br/>
      <div className='question'>
            <b>{question}</b>
      </div>

    
      </div>     
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
