import React, { Fragment } from 'react';
import './NavBar.css';
import { Link } from 'react-router-dom';
import Menu from '../Menu/Menu';
import MenuBtn from '../MenuBtn/MenuBtn';
import { connect } from 'react-redux';

class NavBar extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      visible: false
    };

    this.toggleMenu = this.toggleMenu.bind(this);
    this.handleMouseDown = this.handleMouseDown.bind(this);
  }

  toggleMenu() {
    this.setState({
        visible: !this.state.visible
    });
  }

  handleMouseDown(e) {
    this.toggleMenu();

    e.stopPropagation();
  }

  showProfile() {
    if (this.props.user) {
      return ( <Fragment>
                 <Link className="nav-link" to="/profile"><li>Profile</li></Link>
                 <Link className="nav-link" to="/editor"><li>Editor</li></Link>
                 <Link className="nav-link" to="/bookmarks"><li>Bookmarks</li></Link>
                 <a className="nav-link" href={process.env.REACT_APP_LOGOUT}><li>Logout</li></a>
               </Fragment>
      );
    } else {
      return <a className="nav-link" href={process.env.REACT_APP_LOGIN}><li>Login</li></a>;
    }
  }

  responsiveNav() {
    if (window.screen.width >= 633) {
      return (
        <div className="nav-bar">
          <div className="nav-bar-top">
            <div className="nav-logo">Niewly</div>
          </div>
          <ul className="nav-links">
            <Link className="nav-link" to="/"><li>Feed</li></Link>
            <Link className="nav-link" to="/users"><li>Users</li></Link>
            { this.props.user ? null : <Link className="nav-link" to="/about"><li>About</li></Link> }
            { this.showProfile() }
          </ul>
        </div>
      );
    } else {
      return (
        <div className="nav-bar">
          <div className="nav-bar-top">
            <div className="nav-menu">
              <MenuBtn handleMouseDown={this.handleMouseDown}/>
              <Menu handleMouseDown={this.handleMouseDown}
                    menuVisibility={this.state.visible}
                    user={this.props.userID}/>
            </div>
            <div className="nav-logo-container">
              <div className="nav-logo">Niewly</div>
            </div>
          </div>
        </div>
      );
    }
  }
  render() {
    return (
      <div className="nav">
        { this.responsiveNav() }
      </div>
  );
  }
}

function mapStateToProps(state) {
  return {
    userID: state.userID
  };
}

export default connect(mapStateToProps)(NavBar);