import React, { useState } from 'react';
import Navbar from './Navbar';
import Calendar from 'react-calendar';
import style from '../Cal.css';

function Cal() {
  const [date, setDate] = useState(new Date());
  const [events, setEvents] = useState([]);

  const handleAddEvent = () => {
    const title = prompt('Enter event title:');
    if (title) {
      const newEvent = { title, date };
      setEvents([...events, newEvent]);
    }
  };

  const tileContent = ({ date }) => {
    const event = events.find((event) => event.date.toDateString() === date.toDateString());
    return <p>{event && event.title}</p>;
  };

  return (
    <div className={StyleSheet.Cal}>
      <Navbar />
      <div>
        <h1>Calendar Page</h1>
        <Calendar onChange={setDate} value={date} defaultValue={new Date()} tileContent={tileContent} />
        <button onClick={handleAddEvent}>Add Event</button>
      </div>
    </div>
  );
}

export default Cal;
