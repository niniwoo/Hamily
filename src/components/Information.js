
import React from 'react'
import Navbar from './Navbar'
import Banner from './Banner.js';


export default function Information() {

  return (
    <>    
    <Banner/>
    <div className='container'>
     <p>Email :</p>
     <div className='info-username'>
        <p>Username :</p>
        <button className='change-username-btn'>Change</button>
     </div>
 
     <p>Family Members :</p>
      <Navbar />
    </div>
    </>

  );

}

