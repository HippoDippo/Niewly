import React from 'react';
import './Search.css';
import axios from 'axios';

class Search extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchInput: '',
      stuff: []
    }
  }

  handleSearchInput(event) {
    this.setState({
      searchInput: event.target.value
    });

    // <Search what={'/api/posts'}/> or <Search what={'/api/users'}/>
    axios.get(this.props.what + this.state.searchInput)
    .then(res => {
      this.setState({
        stuff: [...res.data]
      });
    });
  }

  render() {
    return (
      <div className="Search">
        <input value={this.state.searchInput} className="Search-input" onChange={(e) => this.handleSearchInput(e)} />
      </div>
    );
  }
}

export default Search;