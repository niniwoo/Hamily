import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: "",
      password: "",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(e) {
    e.preventDefault();
    const { email, password } = this.state;
    console.log(email, password);

    fetch("http://localhost:3000/login", {
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
      }),
    }).then((res) => res.json())
      .then((data) => {
        console.log(data, "userRegister");
        if (data.status == "ok") {
          alert("login successful!");
          window.localStorage.setItem("token", data.data);
          window.localStorage.setItem("loggedIn", true);

          window.location.href = "./question"
        }
      })

  }
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <Link to={'/sign-in'}>Login </Link>
        <Link to={'/sign-up'}> Sign up </Link>
        <h3>Sign In</h3>

        <div>
          <label>Email address</label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter email"
            onChange={(e) => this.setState({ email: e.target.value })}
          />
        </div>

        <div >
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter password"
            onChange={(e) => this.setState({ password: e.target.value })}
          />
        </div>

        <div>
          <button type="submit">
            Submit
          </button>
        </div>

      </form>
    )
  }
}
