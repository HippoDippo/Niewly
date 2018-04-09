import React, { Fragment } from 'react';
import './NavBar.css';
import { Link } from 'react-router-dom';

export default function NavBar(props) {
  function showProfile() {
    if (props.user) {
      return ( <Fragment>
                 <Link className="nav-link" to="/profile"><li>Profile</li></Link>
                 <Link className="nav-link" to="/editor"><li>Editor</li></Link>
                 <Link className="nav-link" to="/bookmarks"><li>Bookmarks</li></Link>
                 <a className="nav-link" href={'http://localhost:3003/auth/logout'}><li>Logout</li></a>
               </Fragment>
      );
    } else {
      return <a className="nav-link" href="http://localhost:3003/auth"><li>Login</li></a>;
    }
  }

  return (
    <div className="nav">
      <div className="nav-bar">
        <div className="nav-logo">Niewly</div>
        <ul className="nav-links">
          <Link className="nav-link" to="/"><li>Feed</li></Link>
          <Link className="nav-link" to="/users"><li>Users</li></Link>
          { props.user ? null : <Link className="nav-link" to="/about"><li>About</li></Link> }
          { showProfile() }
        </ul>
      </div>
    </div>
  );
}
