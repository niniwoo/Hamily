
import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import Calendar from 'react-calendar';
import style from '../Cal.css';
import Banner from './Banner.js';

function Cal() {
  const [date, setDate] = useState(new Date());
  const [events, setEvents] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState('');
  const [username, setUsername] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [showPopup, setShowPopup] = useState(false);

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
    })
    .then((res) => res.json())
    .then((data) => {
        console.log("answer userData: ", data);
        setUsername(data?.username);  
    })
    .catch((error) => {
        console.log(error);
    }); 
  }, [username]);

  const handleAddEvent = () => {
    setShowForm(true);
  };

  // const handleUsernameChange = (event) => setUsername(event.target.value);

  const handleTitleChange = (event) => {setTitle(event.target.value); console.log("event data: ", event.target.value)};

  const handleStartDateChange = (date) => setStartDate(date);



  const handleCloseForm = () => {
    setShowForm(false);
  };

const handleEventClick = () => {
  setShowPopup(true);
};



  const handleSubmit = (event) => {
    event.preventDefault();
    if (title) {
      // create an array of dates between the start and end date
      const dates = [];
      const currentDate = new Date(startDate);
      currentDate.setDate(currentDate.getDate() + 1);
      dates.push(new Date(currentDate));

      console.log("current date: ", currentDate);

      // create a new event for each date in the array
      dates.forEach((date) => {
        const newEvent = { title, date, username };
        setEvents((prevEvents) => [...prevEvents, newEvent]);
      });

      // setTitle('');
      setUsername('');
      setShowForm(false);
    }
  };

  const tileContent = ({ date }) => {
    const event = events.find((event) => event.date.toDateString() === date.toDateString());
    return (
      <div>

          {event && (
            <p className="cal-item" onClick={handleEventClick}>
              <b className="cal-item-name">{event.username}</b>
            </p>
          )}

      </div>
    );
  };

  console.log("title data: ", title);

  console.log("username: ", username);
  return (
  <>
    <div className={style.Cal}>
      <div className="container">
        <Banner />
        <div className="cal-container">
          <Calendar onChange={setDate} value={date} defaultValue={new Date()} tileContent={tileContent} />
        </div>
        {showForm ? (
          <form onSubmit={handleSubmit} className="form-container">
            <div className="form-box">
              <button className="close-btn" onClick={handleCloseForm}>
                x
              </button>
              <br />
              <div className="cal-form-context">
                <br />
                <label>
                  Event Title :
                  <input type="text" value={title} onChange={(e) => handleTitleChange(e)} />
                </label>
                <br />
                <label>
                  Event Date :
                  <input type="date" value={startDate.toISOString().substring(0, 10)} onChange={(e) => handleStartDateChange(new Date(e.target.value))} />
                </label>
                <br />
                <br />
                <button type="submit" className='cal-form-btn'>Add Event </button>
              </div>
            </div>
          </form>
        ) : (
          <button onClick={handleAddEvent} className='cal-add-btn'>Add Event</button>
        )}
        <Navbar />
        {showPopup && (
          <div className="cal-popup">
            <p>{`${username}, Event Title :  ${title} on ${date.toString().slice(0, 10)}`}</p>
          </div>
        )}
      </div>
    </div>
  </>
);

}

export default Cal;