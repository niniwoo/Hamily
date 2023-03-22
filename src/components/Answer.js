import { useLocation } from 'react-router-dom';
import{ useState } from 'react';
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

  const handleFormSubmit = (event) => {
    event.preventDefault();
    setAnswer(inputValue);
    setInputValue("");
  };

  return (
    <div className='container'>
     
      <p>Question of {month}/{day}: {question}</p>
      <form onSubmit={handleFormSubmit}>
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
