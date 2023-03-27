import React from 'react';
import { useState, useEffect, useContext } from 'react';
import logo from '../css/img/hamily-main-logo.png';


export default function Banner() {
  const [userData, setUserData] = useState("");      
  useEffect(() => {
    fetch("http://localhost:3000/question", {
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
        
        setUserData(data.data);
      });
  }, []);
  return (
    <div className='banner'>
      <img src={logo} alt="logo-hamily2" className='logo-main' />
      <div className='banner-txt'>
         <p>Welcome Back <b>{userData.username}!</b></p>
      </div>
       
      
    </div>
  );
}
