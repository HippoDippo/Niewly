import React from 'react';
import './Users.css';
import axios from 'axios';
import magnifyGlass from '../../img/mag.png';
import ninja from '../../img/ninja.png';
import { connect } from 'react-redux';

class Users extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      users: [],
      followedUsers: []
    };

    this.handleSearchInput = this.handleSearchInput.bind(this);
    this.objIncludes = this.objIncludes.bind(this);
    this.followOrUnfollow = this.followOrUnfollow.bind(this);
  }

  objSplice(followedUsers, id) {
    let index;

    for (var y = 0; y < followedUsers.length; y++) {
      if (followedUsers[y].id === id) {
        index = y;
      }
    }
    followedUsers.splice(index, 1);
  }

  removeTemps(array) {
    for (var y = 0; y < array.length; y++) {
      if (array[y].temp) {
        array.splice(y, 1);
      }
    }
  }

  componentDidMount() {
    if (this.state.followedUsers) {
      let { followedUsers } = this.state;
      this.removeTemps(followedUsers);
      this.setState({
        followedUsers: followedUsers
      });
    }

    axios.all([
      axios.get('/api/getAllUsers'),
      axios.get('/api/getFollowedUsers/' + this.props.userID)
    ])
    .then(axios.spread((usersRes, followedUsersRes) => {
      console.log(usersRes);
      console.log(followedUsersRes);
      this.setState({
        users: [...usersRes.data],
        followedUsers: [...followedUsersRes.data]
      });
    }));
  }

  handleFollowClick(i, event) {
    axios.post('/api/followUser', { userID: this.props.userID, followedUserID: i });

    let randomID = Math.floor(Math.random * 33333);
    let updatedFollowedusers = this.state.followedUsers;
    updatedFollowedusers.push({ temp: true, id: randomID, user_id: this.props.userID, followed_user_id: i});
    this.setState({
      followedUsers: updatedFollowedusers
    });
    // Force a re-render.
  }

  handleUnfollowClick(i, event) {
    axios.delete('/api/unfollowUser/' + this.props.userID + '/' + i);

    let updatedFollowedUsers = this.state.followedUsers;
    this.objSplice(updatedFollowedUsers, i);
    this.setState({
      followedUsers: updatedFollowedUsers
    });
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

  objIncludes(array, id) {
    for (var y = 0; y < array.length; y++) {
      if (array[y].followed_user_id === id)
        return true;
    }
    return false;
  }

  followOrUnfollow(followedUsers, id) {
    if (this.props.userID && !this.objIncludes(followedUsers, id)) {
      return <li onClick={this.handleFollowClick.bind(this, id)} className="Post-item follow-button">Follow</li>;
    } else if (this.props.userID && this.objIncludes(followedUsers, id)) {
      return <li onClick={this.handleUnfollowClick.bind(this, id)} className="Post-item follow-button">Unfollow</li>;
    } else if (!this.props.userID) {
      return null;
    }
  }

  render() {

    let users = this.state.users.map((e, i, arr) => {
      return (<div key={arr[i].id} id={arr[i].id} className="User">
                <div className="User-header">
                  <h2 className="User-heading">{arr[i].user_name}</h2>
                  { arr[i].img ? <img className="profile-img" src={arr[i].img}/> : <img className="profile-img" src={ninja} /> }
                </div>
                <div className="User-content">
                  <ul className="User-items">
                    <div className="User-buttons">
                      {/* { this.props.userID ? <li onClick={this.handleFollowClick.bind(this, arr[i].id)} className="Post-item follow-button">Follow</li> : null } */}
                      { this.followOrUnfollow(this.state.followedUsers, arr[i].id) }
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