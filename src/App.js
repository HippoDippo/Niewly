import React, { Component } from 'react';
import './reset.css';
import './App.css';
import NavBar from './components/NavBar/NavBar';
import Routes from './routes';

class App extends Component {
  constructor(props) {
    super(props);
  }

  // showNav() {
  //   if (this.props.match.path !== '/') {
  //     return (
  //       <div>
  //         <NavBar />
  //         {Routes}
  //       </div>
  //     );
  //   }
  // }

  render() {
    console.log(this.props.match);
    return (
      <div className="App">
        {/* {this.showNav()} */}
        <NavBar />
        {Routes}
      </div>
    );
  }
}

export default App;

