import React from 'react';
import './Users.css';
import axios from 'axios';
import magnifyGlass from '../../img/mag.png';
import { connect } from 'react-redux';

class Users extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      users: []
    };

    this.handleSearchInput = this.handleSearchInput.bind(this);
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
  }

  handleSearchInput(event) {
    if (event.target.value) {
      let searchInput = event.target.value;
      axios.get('/api/searchusers/' + searchInput)
      .then(users => {
        this.setState({
          users: [...users.data]
        });
      });
    } else {
      axios.get('/api/getAllUsers')
        .then(res => {
          this.setState({
            users: [...res.data]
          });
        });
    }
  }

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
        <div className="search">
          <img className="search-img" src={magnifyGlass} />
          <input className="search-input"onChange={(e) => this.handleSearchInput(e)} />
        </div>
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