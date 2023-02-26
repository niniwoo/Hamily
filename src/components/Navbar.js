import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar() {
    return (
        <nav className='navbar'>
            <ul>
                <CustomLink to="/question">Q</CustomLink>
                <CustomLink to="/chat">C</CustomLink>
                <CustomLink to="/calendar">CA</CustomLink>
                <CustomLink to="/secret-box">SB</CustomLink>
                <CustomLink to="/setting">setting</CustomLink>
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



