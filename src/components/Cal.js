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

  const handleAddEvent = () => {
    setShowForm(true);
  };

  const handleUsernameChange = (event) => setUsername(event.target.value);

  const handleTitleChange = (event) => setTitle(event.target.value);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (title) {
      const newEvent = { title, date, username };
      setEvents([...events, newEvent]);
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
