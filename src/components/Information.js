
import React, { useEffect,useState } from 'react'
import Navbar from './Navbar'
import Banner from './Banner.js';
import logo from '../css/img/hamily-logo3.png';


export default function Information() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");


  useEffect(()=>{
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
       setEmail(data.email);
       setUsername(data.username);
        
      })
  },[])
 
  return (
    <>    
   
    <div className='container'>
     <Banner/>
  
      <img src={logo} alt="logo-hamily2" className='logo3' />
      <div className='info-container'>
      <h2 className='ur-info'>Your Information</h2>
        <b>Email : {email}</b>  <br/> 
        <b>Username :   {username}</b><br/>
      </div>

  
      
 
      <Navbar />
    </div>
    </>

  );

}

