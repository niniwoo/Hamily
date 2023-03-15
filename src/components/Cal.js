import React, { useState } from 'react';
import Navbar from './Navbar';
import Calendar from 'react-calendar';
import style from '../Cal.css';

function Cal() {
  const [date, setDate] = useState(new Date());
  const [events, setEvents] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState('');
  const [username, setUsername] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const handleAddEvent = () => {
    setShowForm(true);
  };

  const handleUsernameChange = (event) => setUsername(event.target.value);

  const handleTitleChange = (event) => setTitle(event.target.value);

  const handleStartDateChange = (date) => setStartDate(date);

  const handleEndDateChange = (date) => setEndDate(date);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (title) {
      // create an array of dates between the start and end date
      const dates = [];
      const currentDate = new Date(startDate);
      while (currentDate <= endDate) {
        dates.push(new Date(currentDate));
        currentDate.setDate(currentDate.getDate() + 1);
      }

      // create a new event for each date in the array
      dates.forEach((date) => {
        const newEvent = { title, date, username };
        setEvents([...events, newEvent]);
      });

      setTitle('');
      setUsername('');
      setShowForm(false);
    }
  };

  const tileContent = ({ date }) => {
    const event = events.find((event) => event.date.toDateString() === date.toDateString());
    return (
      <div>
        <p>{event && event.username}</p>
        <p>{event && event.title}</p>
      </div>
    );
  };
  

  return (
    <div className={style.Cal}>
      <Navbar />
      <div>
        <h1>Calendar Page</h1>
        <Calendar onChange={setDate} value={date} defaultValue={new Date()} tileContent={tileContent} />
        {showForm ? (
          <form onSubmit={handleSubmit}>
            <label>
              Your Name:
              <input type="text" value={username} onChange={handleUsernameChange} />
            </label>
            <br />
            <label>
              Event Title:
              <input type="text" value={title} onChange={handleTitleChange} />
            </label>
            <br />
            <label>
              Start Date:
              <input type="date" value={startDate.toISOString().substring(0, 10)} onChange={(e) => handleStartDateChange(new Date(e.target.value))} />
            </label>
            <br />
            <label>
              End Date:
              <input type="date" value={endDate.toISOString().substring(0, 10)} onChange={(e) => handleEndDateChange(new Date(e.target.value))} />
            </label>
            <br />
            <button type="submit">Add Event</button>
          </form>
        ) : (
          <button onClick={handleAddEvent}>Add Event</button>
        )}
      </div>
    </div>
  );
}

export default Cal;
