import React from 'react';
import './Search.css';
import axios from 'axios';

class Search extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      users: []
    };
  }

  handleSearchInput(event) {
    let searchInput = event.target.value + '%';
    axios.get('/api/searchusers/' + searchInput)
    .then(users => {
      this.setState({
        users: [...users.data]
      });
    });
  }

  render() {
    return (
      <div className="searc-bar">
        <input />
      </div>
    );
  }
}

