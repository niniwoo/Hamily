import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import logo from '../css/img/hamily-logo3.png';
   
export default class SignUp extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: "",
      username:" ",
      password: "",
      password2: ""

    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(e) {
    e.preventDefault();
    const { email, username,password, password2 } = this.state;
    if (password !== password2) {
      alert('Please check the password');
    }
    if(email == "" || username==""|| password == "" || password2 =="" ){
      alert('Please enter all the information');
    } 
    else {
      console.log(email, username,password, password);
      fetch("http://localhost:4000/register", {
        method: "POST",
        crossDomain: true,
        headers: {
          mode: 'no-cors',
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          email,
          username,
          password,
          password2
        }),
      }).then((res) => res.json())
        .then((data) => {
          alert('Signed up Successfully!')
          console.log(data, "userRegister")
        })
    }

  }
  render() {
    return (
      <div className='container'>
      <form onSubmit={this.handleSubmit} className="signup-form">
      <div className='signup-container'>
    <h3 className='signup-text'>Welcome to HAMILY !</h3>
          <div >
            <img src={logo} alt="logo-hamily2" className='logo4' />
            <input
              type="email"
              className="form-control"
              placeholder="Enter email"
              onChange={(e) => this.setState({ email: e.target.value })}
            />
          </div>

          <div>
            <input
              type="text"
              className="form-control"
              placeholder="Enter username"
              onChange={(e) => this.setState({ username: e.target.value })}
            />
          </div>

          <div>
            <input
              type="password"
              className="form-control"
              placeholder="Enter password"
              onChange={(e) => this.setState({ password: e.target.value })}
            />
          </div>

          <div>
            <input
              type="password"
              className="form-control"
              placeholder="Enter password to confirm"
              onChange={(e) => this.setState({ password2: e.target.value })}
            />
          </div>


          <div>
            <button type="submit" className='signup-btn'>
              Sign Up
            </button>
          </div>
    <b className='signup-p'>
    Already registered <a href="/sign-in">sign in?</a>
    </b>

        </div>
      
      </form>
      </div>

    )
  }
}
