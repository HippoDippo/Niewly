import React from 'react';
import './NavBar.css';
import { Link } from 'react-router-dom';

export default function NavBar(props) {
  return (
    <div className="nav">
      <h2 className="nav-logo">Niewly</h2>
      <div className="nav-bar">
        <ul>
          <li>Feed</li>
          <li>Profile</li>
          <li>Editor</li>
        </ul>
      </div>
    </div>
  );
}




