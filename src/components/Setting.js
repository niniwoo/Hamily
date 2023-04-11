
import React from 'react'
import Navbar from './Navbar'
import Banner from './Banner.js';
import { useNavigate } from 'react-router-dom';
import logo from '../css/img/hamily-logo2.png';
  



export default function Setting() {

const navigate = useNavigate();
  const logOut = () => {
    window.localStorage.clear();
    window.location.href = "./sign-in";
  };
  const goToInfo = () => {
    navigate("/information"); 
  };
  return (
    <>    
    <div className='container'>
      <Banner/>
      <img src={logo} alt="logo-hamily2" className='logo2' />

      <div className='setting-btns'>
      <button onClick={goToInfo}className="info-btn">INFORMATION</button>
      <button onClick={logOut} className="logout-btn">LOGOUT</button>
      </div>
      <Navbar />
    </div>
    </>

  );

}

