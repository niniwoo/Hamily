import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class SignUp extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: "",
      password: "",
      password2: ""

    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(e) {
    e.preventDefault();
    const { email, password, password2 } = this.state;
    if (password !== password2) {
      alert('Please check the password');
    } else {
      console.log(email, password, password2);
      fetch("http://localhost:3000/register", {
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
      <form onSubmit={this.handleSubmit}>
        <Link to={'/sign-in'}>Login </Link>
        <Link to={'/sign-up'}> Sign up </Link>
        <h3>Sign Up</h3>
        <div >
          <label>Email address</label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter email"
            onChange={(e) => this.setState({ email: e.target.value })}
          />
        </div>

        <div>
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter password"
            onChange={(e) => this.setState({ password: e.target.value })}
          />
        </div>

        <div>
          <label>Password Confirmation</label>
          <input
            type="password2"
            className="form-control"
            placeholder="Enter password to confirm"
            onChange={(e) => this.setState({ password2: e.target.value })}
          />
        </div>

        <div>
          <button type="submit">
            Sign Up
          </button>
        </div>
        <p>
          Already registered <a href="/sign-in">sign in?</a>
        </p>
      </form>
    )
  }
}
