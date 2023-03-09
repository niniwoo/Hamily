import React from 'react'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import { Routes, Route } from 'react-router-dom'

import Login from './components/login.components'
import SignUp from './components/signup.components'
import Question from './components/question'
import Navbar from './components/Navbar'
import Chat from './components/Chat'
import Setting from './components/Setting'
import SecretBox from './components/SecretBox'
import Cal from './components/Cal'

function App() {
  const isLoggedIn = window.localStorage.getItem("loggedIn");
  return (
    <>
      <div className="App">
        <Routes>
          <Route exact path="/" element={isLoggedIn == "true" ? <Question /> : <Login />} />
          <Route path="/question" element={<Question />} />
          <Route path="/sign-in" element={<Login />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path='/chat' element={<Chat />} />
          <Route path='/secret-box' element={<SecretBox />} />
          <Route path='/setting' element={<Setting />} />
          <Route path='/calendar' element={<Cal />} />
        </Routes>
      </div>
    </>
  )
}

export default App

