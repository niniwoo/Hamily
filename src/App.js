import React from 'react'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'

import Login from './components/login.components'
import SignUp from './components/signup.components'
import Question from './components/question'

function App() {
  return (
    <Router>
      <div className="App">
          <div >
                  <Link to={'/sign-in'}>Login </Link>               
                  <Link to={'/sign-up'}> Sign up </Link>             
          </div>

          <div className="auth-inner">
            <Routes>
              <Route exact path="/" element={<Login />} />
              <Route path="/question" element={<Question />} />
              <Route path="/sign-in" element={<Login />} />
              <Route path="/sign-up" element={<SignUp />} />
            </Routes>
          </div>
       
      </div>
    </Router>
  )
}

export default App

