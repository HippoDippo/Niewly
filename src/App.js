import React, { Component } from 'react';
import './reset.css';
import './App.css';
import axios from 'axios';
import NavBar from './components/NavBar/NavBar';
import Routes from './routes';
import { connect } from 'react-redux';
import { updateUserId } from './ducks/reducer';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: ''
    };
  }

  componentDidMount() {
    axios.get('/auth/me')
    .then(res => {
      // this.props.dispatch(updateUserId(res.data.id));
      this.setState({
        user: res.data.user_name
      });
    });
  }

  render() {
    return (
      <div className="App">
        <NavBar user={this.state.user}/>
        {Routes}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {};
}

export default connect(mapStateToProps)(App);