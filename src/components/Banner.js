
import logo from '../css/img/hamily-main-logo.png';
import React, { Component } from 'react'

export default class Banner extends Component {
constructor(props){
    super(props);
    this.state ={
        userData:"",
    };
}
  componentDidMount(){
      
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
        console.log(data,"userData");
        this.setState({ userData: data.data});
      })
    
   
  }
  render() {
    return (  
      <div className='banner'>
      <img src={logo} alt="logo-hamily2" className='logo-main' />
      <div className='banner-txt'>
         <p>Welcome Back <b>{this.state.userData.username} !</b></p>
      </div> 
    </div>
    )
  }
}

