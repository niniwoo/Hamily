import React from 'react';
import { useState, useEffect, useContext } from 'react';
import logo from '../css/img/hamily-main-logo.png';


export default function Banner() {
  const [userData, setUserData] = useState("");      
  useEffect(() => { 
    fetch("http://localhost:3000/login") 
    .then((response) => { 
        if (response.ok) { return response.json(); } 
        throw new Error("Network response was not ok."); }) 
        .then((data) => { 
            console.log("data", data); 
            setUserData(data); 
        }) 
        .catch((error) => {
             console.error("There was a problem with the fetch operation:", error); 
            });
         }, []);
  return (
    <div className='banner'>
      <img src={logo} alt="logo-hamily2" className='logo-main' />
      <div className='banner-txt'>
         <p>Welcome Back <b>{userData}!</b></p>
      </div>
       
      
    </div>
  );
}
