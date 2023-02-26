import React, { Component } from 'react'
import Navbar from './Navbar'

export default class Question extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: "",
    };
  }
  componentDidMount() {

    fetch("http://localhost:3000/question", {
      method: "POST",
      crossDomain: true,
      headers: {
        mode: 'no-cors',
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        token: window.localStorage.getItem("token"),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "userData");
        this.setState({ userData: data.data });
      });
  };

  logOut = () => {
    window.localStorage.clear();
    window.location.href = "./sign-in";
  }

  render() {
    return (
      <div >
        <Navbar />
        <p>
          Hello,{this.state.userData.email}!
        </p>
        <button onClick={this.logOut}>LOGOUT</button>

      </div>
    )
  }
}
