import React from 'react';
import './Login.css';

class Login extends React.Component {
  render() {
    console.log(this.props.match);
    return (
      <div className="login">
        <h1>Login</h1>
      </div>
    );
  }
}

export default Login;