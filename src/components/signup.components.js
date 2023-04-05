import React, { Component } from 'react'
import { Link } from 'react-router-dom'
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
        <h3>Sign Up</h3>
        <div >
          <input
            type="email"
            className="form-control"
            placeholder="Enter email"
            onChange={(e) => this.setState({ email: e.target.value })}
          />
        </div>

        <div>
          {/* <label>Username Confirmation</label> */}
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
        <p>
          Already registered <a href="/sign-in">sign in?</a>
        </p>
      </form>
      </div>

    )
  }
}
