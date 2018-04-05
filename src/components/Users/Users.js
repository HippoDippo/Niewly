import React from 'react';
import './Users.css';
import axios from 'axios';
// import Search from '../Search/Search';
import { connect } from 'react-redux';

class Users extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      users: []
      // searchInput: ''
    };

    // this.handleSearchInput = this.handleSearchInput.bind(this);
  }

  componentDidMount() {
    axios.get('/api/getAllUsers')
    .then(res => {
      this.setState({
        users: [...res.data]
      });
    });
  }

  handleFollowClick(i, event) {
    axios.post('/api/followUser', { userID: this.props.userID, followedUserID: i });
    console.log('Followed!');
  }

  // handleSearchInput(event) {
  //   this.setState({
  //     searchInput: event.target.value
  //   });
  // }

  render() {

    let users = this.state.users.map((e, i, arr) => {
      return (<div key={arr[i].id} id={arr[i].id} className="User">
                <div className="User-header">
                  <h2 className="User-heading">{arr[i].user_name}</h2>
                  <img className="profile-img" src={arr[i].img} alt="profile image"/>
                </div>
                <div className="User-content">
                  <ul className="User-items">
                    <div className="User-buttons">
                      { this.props.userID ? <li onClick={this.handleFollowClick.bind(this, arr[i].id)} className="Post-item follow-button">Follow</li> : null }
                    </div>
                  </ul>
                </div>
              </div>
      );
    });

    return (
      <div className="Users">
        {/* <input value={this.state.searchInput} onChange={(e) => this.handleSearchInput(e)} />
        {<Search /> ? <Search /> : users}
        <Search searchInput={this.state.searchInput}/> */}
        {users}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    userID: state.userID
  };
}

export default connect(mapStateToProps)(Users);