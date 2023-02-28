import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar() {
    return (
        <nav className='navbar'>
            <ul>
                <CustomLink to="/question">Question</CustomLink>
                <CustomLink to="/chat">Chat</CustomLink>
                <CustomLink to="/calendar">Calendar</CustomLink>
                <CustomLink to="/secret-box">SecretBox</CustomLink>
                <CustomLink to="/setting">Setting</CustomLink>
            </ul>
        </nav>
    )
}

function CustomLink({ to, children, ...props }) {
    const path = window.localStorage.pathname
    return (
        <li className={path === to ? "active" : ""}>
            <Link to={to}{...props}>
                {children}
            </Link>
        </li>
    )
}



