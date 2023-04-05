
import React, { useEffect,useState } from 'react'
import Navbar from './Navbar'
import Banner from './Banner.js';


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
       setEmail(data.data.email);
       setUsername(data.data.username);
      //  console.log("data!!!!!!!!:",data);
        // this.setState({ userData: data.data});
        
      })
  },[])
 
  return (
    <>    
   
    <div className='container'>
     <Banner/>
     <p>Email :{email}</p>
     <div className='info-username'>
        <p>Username : {username}</p><br/>

     </div>
 
     <p>Family Members :</p>
      <Navbar />
    </div>
    </>

  );

}

