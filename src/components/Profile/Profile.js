import React from 'react';
import './Profile.css';
import axios from 'axios';
import { connect } from 'react-redux';
import { updateUserId, updatePostId } from '../../ducks/reducer';
import { Link } from 'react-router-dom';

class Profile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userName: '',
      userImg: '',
      userID: 0,
      posts: []
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
      axios.get('/api/getOurPosts/' + res.data.id)
      .then(posts => {
        this.setState({
          posts: [...posts.data]
        });
        console.log(posts.data);
      });
    });
  }

  handleClickView(i, event) {
    this.props.dispatch(updatePostId(i));
  }

  render() {
    let { userName } = this.state;
    let { userImg } = this.state;
    let { userID } = this.state;

    let userPosts = this.state.posts.map((e, i, arr) => {
      return (<div key={arr[i].id} id={arr[i].id} className="Post">
                <div className="Post-header">
                  <h2 className="Post-heading">{arr[i].post_title}</h2>
                </div>
                <div className="Post-content">
                  <ul className="Post-items">
                    <li className="Post-item Post-intro">{arr[i].post_intro}</li>
                    <li className="Post-item">Author: <span className="author">{arr[i].post_author}</span></li>
                    <div className="Post-buttons">
                      <Link to="/postView" onClick={this.handleClickView.bind(this, arr[i].id)} className="Post-item view-button"><li>View</li></Link>
                      {/* { this.props.userID ? <li onClick={this.handleClickSave.bind(this, arr[i].id)} className="Post-item save-button">Save</li> : null } */}
                    </div>
                  </ul>
                </div>
              </div>
      );
    });

    this.props.dispatch(updateUserId(userID));

    return (
      <div className="profile">
        <div className="profile-info">
          <h1 className="user-name">{userName}</h1>
          <img src={userImg} className="profile-img" />
        </div>
        <div className="profile-posts">
          <div className="profile-user-posts">
            <h1 className="profile-user-posts-heading">Your Posts</h1>
            <div className="Posts">{userPosts}</div>
          </div>
          <div className="profile-followed-user-posts">
            <h1 className="profile-followed-user-posts-heading">Followed Posts</h1>
            {/* <FollowedUsersPosts /> */}
            <div className="Posts">{userPosts}</div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {};
}

export default connect(mapStateToProps)(Profile);