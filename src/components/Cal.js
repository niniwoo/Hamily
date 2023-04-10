
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
        setUsername(data?.data?.username);  
    })
    .catch((error) => {
        console.log(error);
    }); 
  }, [username]);

  const handleAddEvent = () => {
    setShowForm(true);
  };

  // const handleUsernameChange = (event) => setUsername(event.target.value);

  const handleTitleChange = (event) => {setTitle(event.target.value); 
  console.log("event data: ", event.target.value)};
  const handleStartDateChange = (date) => setStartDate(date);

  const handleCloseForm = () => {
    setShowForm(false);
  };

  const handleEventClick = () => {
    setShowPopup(true);
  };


// useEffect(() => {
//   fetch("http://localhost:4000/calendars")
//     .then((res) => res.json())
//     .then((data) => {{
//         setEvents(data.data);
//         setDate(data.data);
//       }
//     })
//     .catch((error) => {
//       console.log(error);
//     });
// }, []);

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
        // console.log("calendar userData: ", data);
        setUsername(data?.username);
    })
    .catch((error) => {
        console.log(error);
    }); 
  }, [username])
  //getting data from /calendars
  
  
  const handleSubmit = (event) => {
    event.preventDefault();
     fetch("http://localhost:4000/calendars", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      }, 
      body: JSON.stringify({
        username: username,
        etitle:title,
        edate:startDate,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("data from the answer component", data);
        if (data.status === "ok") {
          console.log("Saved your answer!");
           // set answer state to show the answer below the form
        } else {
          console.log("Failed to save your answer.");
        }
      })
      .catch((error) => {
        console.log("Error occurred while saving your answer.", error);
      });


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

      setUsername('');
      setShowForm(false);
    }
  };

  const tileContent = ({ date }) => {
    const event = events.find((event) => event.date.toDateString() === date.toDateString());
    return (
      <div>
        <ul>
          {event && (
            <li style={{ color: 'red' }} className="cal-item" onClick={handleEventClick}>
              <p className="cal-item-name">{event.username}</p>
            </li>
          )}
        </ul>
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
                        {/* <p>{`${username}, Event Title :  ${events} on ${date.toString().slice(0, 10)}`}</p> */}

          </div>
        )}
      </div>
    </div>
  </>
);
        }
export default Cal;
