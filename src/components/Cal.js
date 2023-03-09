// import React , { useState }from 'react'
import React , { useState }from 'react'
import Navbar from './Navbar'
import Calendar from 'react-calendar'
import style from '../Cal.css'

function Cal() {

  const [date, setDate] = useState(new Date());
  return (
    <div className={StyleSheet.Cal}>
      <Navbar />      
      Calendar Page
      <Calendar 
      onChange={setDate} 
      value={date} 
      defaultValue={new Date()}
      />
    <button>+</button>
    </div>
  )
}

export default Cal;





