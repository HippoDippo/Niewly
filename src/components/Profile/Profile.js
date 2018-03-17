import React from 'react';
import './Profile.css';
import axios from 'axios';

class Profile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userName: '',
      userImg: ''
    }
  }

  componentDidMount() {
    axios.get('/auth/me')
    .then(res => {
      this.setState({
        userName: res.data.user_name,
        userImg: res.data.img
      });
    });
  }

  render() {
    let { userName } = this.state;
    let { userImg } = this.state;

    return (
      <div className="profile">
        <h1 className="user-name">{userName}</h1>
        <img src={userImg} className="profile-img" />
        {/* <Posts /> */}
        {/* <FollowedUsersPosts /> */}
      </div>
    );
  }
}

export default Profile;