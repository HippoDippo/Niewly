import React from "react";
import "./Menu.css";
import { Link } from 'react-router-dom';

function Menu(props) {

  var visibility = "hide";

  if (props.menuVisibility) {
    visibility = "show";
  }

  if (props.user) {
    return (
      <div id="flyoutMenu"
           onMouseDown={props.handleMouseDown}
           className={visibility}>
        <Link to="/"><h2>Feed</h2></Link>
        <Link to="/users"><h2>Users</h2></Link>
        <Link to="/profile"><h2>Profile</h2></Link>
        <Link to="/editor"><h2>Editor</h2></Link>
        <Link to="/bookmarks"><h2>Bookmarks</h2></Link>
        <h2 className="login-logout"><a href={process.env.REACT_APP_LOGOUT}>Logout</a></h2>
      </div>
  );
  } else {
    return (
      <div id="flyoutMenu"
           onMouseDown={props.handleMouseDown}
           className={visibility}>
        <Link to="/"><h2>Feed</h2></Link>
        <Link to="/users"><h2>Users</h2></Link>
        <Link to="/about"><h2>About</h2></Link>
        <h2 className="login-logout"><a href={process.env.REACT_APP_LOGIN}>Login</a></h2>
      </div>
    );
  }
}

export default Menu;