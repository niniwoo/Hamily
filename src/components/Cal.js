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
      <Calendar 
      onChange={setDate} 
      value={date} 
      defaultValue={new Date()}
      />
      Calendar Page
    </div>
  )
}

export default Cal;





