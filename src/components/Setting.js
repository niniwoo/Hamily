
import React from 'react'
import Navbar from './Navbar'


export default function Setting() {

  const logOut = () => {
    window.localStorage.clear();
    window.location.href = "./sign-in";
  };
  return (
    <div>
      <Navbar />

      <button onClick={logOut}>LOGOUT</button>

    </div>
  );

}

