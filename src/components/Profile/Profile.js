import React from 'react';
import './Profile.css';
import axios from 'axios';
import { connect } from 'react-redux';
import { updateUserId } from '../../ducks/reducer';

class Profile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userName: '',
      userImg: '',
      userID: 0
    }
  }

  componentDidMount() {
    axios.get('/auth/me')
    .then(res => {
      this.setState({
        userName: res.data.user_name,
        userImg: res.data.img,
        userID: res.data.id
      });
    });
  }

  render() {
    let { userName } = this.state;
    let { userImg } = this.state;
    let { userID } = this.state;

    this.props.dispatch(updateUserId(userID));

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

function mapStateToProps(state) {
  return {};
}

export default connect(mapStateToProps)(Profile);