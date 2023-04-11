import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import Banner from './Banner.js';
import icon from '../css/img/love-letter.png';
import { appContext } from '../providers/AppProvider';

function Question() {

  const [currentQuestion, setCurrentQuestion] = useState("");
  const {chatName,setChatName} = useContext(appContext);

  useEffect(() => {
    fetch("http://localhost:4000/question", {
      method: "POST",
      crossDomain: true,
      headers: {
        mode: 'no-cors',
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
        
        setChatName(data.username);
        // console.log('chatName:  ',chatName);
      });
  }, []);

  const questions = [
    "What is your favorite music genre?",
    "Are you a cat or a dog?",
    "What kind of food do you hate the most?",
    "When COVID is over, where would you want to travel?",
    "What do you think you’ll be doing five years from now?",
    "Who is the most interesting person you’ve ever met?",
    "What is the best movie you've ever watched",
    "What is the best thing about your job?",
    "What is the difference between a good idea and a great idea?",
    "What is the number one thing you wish you could change about how people see you?",
    "What toy do you miss?",
    "What is the best way to make someone feel like they’ve accomplished something?",
    "What do you dream?",
    "When do you prefer to eat alone?",
    "How do you know when to speak?",
    "When is it OK to ask someone to change something about themselves?",
    "What do you think of when you hear the word 'love'?",
    "What would you do if you did not need sleep?",
    "What accomplishments don’t matter?",
    "What is the most important decision you have never made?",
    "What kind of pet would you be?",
    "What is the number one thing you wish you could change about your friends?",
    "Are you really in control?",
    "What makes you proud of others?",
    "How do you feel about the word 'win'?",
    "What do you think about when you’re making a decision?",
    "When did you hurt someone’s feelings?",
    "What do you consider your greatest achievement?",
    "What do you do when you are bored?",
    "What do you think is the most important thing you can do in life?",
    "What do you think is the most important quality to have in life?",
    "Who has been the most influential person in your life?",
    "What do you think about when you’re happy?",
    "What is the difference between a lover and a friend?",
    "What’s something you’ve never done?",
    "What is a difficult thing you avoided facing?",
    "What is the one thing you wish you had done differently when you were younger?",
    "What is the most valuable thing you taught yourself?",
    "What’s something you’ve never told anyone?",
    "What is the number one problem in the world today?",
    "What is the number one thing you wish you could change about the world?",
    "What are your hopes for the future?",
    "What is the number one thing you wish you could change about your country?",
    "How do you know when you’re being selfish?",
    "What is the most difficult thing about your job?",
    "What is the biggest mistake you have ever made?",
    "What is the one thing you would like to accomplish before you die?",
    "What is the most important thing you need to change in your life?",
    "What do you think is the most important thing you need to do right now?",
    "What is the one thing you would do if you knew you would never be alone?",
    "What do you do to unwind?",
    "What are you passionate about?",
    "What’s something you can’t live without?",
    "What is the worst way to make someone feel?",
    "Do you ever have trouble deciding what to do?",
    "What’s the worst thing that’s ever happened to you?",
    "If not now, when?",
    "What do you think of when you think of Earth?",
    "What do you think about when you’re angry?",
    "What do you think of when you think of your childhood?",
    "What is the difference between what you know and what you don’t know?",
    "What is the one thing you wish you could change about your family?",
    "What do you consider to be your greatest failure?",
    "What is the most important thing you can do for yourself today?",
    "What do you like least about yourself?",
    "If you could live any kind of life you wanted, what would you choose?",
    "What’s the last time you were really scared?",
    "What are your greatest strengths?",
    "What are your goals for the next twelve months?",
    "What is the one thing you are not afraid to admit to yourself?",
    "What do you consider to be your greatest accomplishment last year?",
    "What do you do to build your courage?",
    "What are you most grateful for?",
    "What is the last thing you cried about?",
    "What is the most important thing you can do for your community?",
    "What is the best thing you have ever done?",
    "What is the most important thing you’ve learned in the last five years?",
    "What are your three most important goals for the next year?",
    "What do you like most about yourself?",
    "How many people do you trust?",
    "What do you think of when you think of heaven?",
    "What is the one thing you would do if you knew you couldn’t fail?",
    "What is the number one thing you wish you knew how to do?",
    "What are you the best at?",
    "What is the most important lesson you’ve learned from your coworkers?",
    "What is the one thing you wish you could change about your parents?",
    "What do you consider your strangest behavior?",
    "What is the one thing you wish you could change about your mornings?",
    "What is the most interesting thing you’ve ever heard?",
    "What do you believe is the most important quality in a person?",
    "If you could only read one book for the rest of your life, what would it be?",
    "What do you not believe in?",
    "What do you want to do when you grow up?",
    "What are you mildly afraid of?",
    "What is something you created that you are proud of?",
    "What’s the most beautiful thing you’ve ever seen?",
    "If you were to die tomorrow, what would you most regret not having done?",
    "What is your most embarrassing moment?",
    "What is the most important thing you have ever done?",

    
  ];

  const today = new Date();
  const monthNumber = today.getMonth()+1;
  const dayNumber = today.getDate();
  const index = dayNumber % questions.length;

  const [question, setQuestion] = useState(questions[index]);

  useEffect(() => {
    const newIndex = (index + 1) % questions.length;
    const newQuestion = questions[newIndex];
    setQuestion(newQuestion);
    setCurrentQuestion(newQuestion);
  }, [index, setCurrentQuestion]);


  const navigate = useNavigate();

  const goToAnswer = () => {
    navigate("/answer", { state: { question: question, monthNumber:monthNumber, dayNumber:dayNumber } }); 
  };
  const goToPastAnswer = () => {
    navigate("/history", { state: { question: question, monthNumber:monthNumber, dayNumber:dayNumber } }); 
  };

  return (
    <>        
    
    <div className='container'>
    <Banner/>
      <div className='question-container'>
        <div className='question-info'>
          <br/>
            <h3>Question of {monthNumber}/{dayNumber}:</h3>
        
        </div>

      <img src={icon} alt='letter-icon' className='letter-icon'></img>
      <br/>
      <div className='question'>
            <b>{question}</b>
      </div>
      
      </div>      
      <div className='question-btns'>
        <button onClick={goToAnswer} className='question-write-btn'>Write The answer</button>
        <br/>
        <button onClick={goToPastAnswer} className='question-check-btn'> Check all the answer</button>
        <br/>
      </div>
      <Navbar />
    </div>
  </>

  );
  
}

export default Question;
