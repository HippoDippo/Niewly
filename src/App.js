import React, { Component } from 'react';
import './reset.css';
import './App.css';
import NavBar from './components/NavBar/NavBar';
import Routes from './routes';

class App extends Component {
  render() {
    return (
      <div className="App">
        <NavBar />
        {Routes}
      </div>
    );
  }
}

export default App;