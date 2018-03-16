import React from 'react';
import './NavBar.css';
import { Link } from 'react-router-dom';

export default function NavBar(props) {
  return (
    <div className="nav">
      <div className="nav-bar">
        <div className="nav-logo">Niewly</div>
        <ul className="nav-links">
          <Link className="nav-link" to="/feed"><li>Feed</li></Link>
          <Link className="nav-link" to="/users"><li>Users</li></Link>
          <Link className="nav-link" to="/profile"><li>Profile</li></Link>
          <Link className="nav-link" to="/editor"><li>Editor</li></Link>
        </ul>
      </div>
    </div>
  );
}