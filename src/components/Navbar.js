import React from 'react';
import { Link } from 'react-router-dom';
import calendarIcon from '../css/img/calendar.png';
import sbIcon from '../css/img/secret.png'
import settingIcon from '../css/img/settings.png'
import questionIcon from '../css/img/request.png'
import chatIcon from '../css/img/chat.png'

export default function Navbar() {
  return (
    <nav className='navbar'>
      
        <CustomLink to="/question" icon={questionIcon}></CustomLink>
        <CustomLink to="/chat" icon={chatIcon} ></CustomLink>
        <CustomLink to="/calendar" icon={calendarIcon}></CustomLink>
        <CustomLink to="/secret-box" icon={sbIcon}></CustomLink>
        <CustomLink to="/setting" icon={settingIcon}></CustomLink>
      
    </nav>
  );
}

function CustomLink({ to, icon, children, ...props }) {
  const path = window.localStorage.pathname;
  return (
    <div>
      <li className={path === to ? "active" : ""}>
        <Link to={to} {...props}>
          <img src={icon} alt={children} className='nav-icons'  />
          {children}
        </Link>
      </li>
    </div>
  );
}
