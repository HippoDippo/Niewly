import React from 'react';
import './Profile.css';
import axios from 'axios';
import { connect } from 'react-redux';
import { updateUserId, updatePostId } from '../../ducks/reducer';
import { Link } from 'react-router-dom';
import ninja from '../../img/ninja.png';

class Profile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userName: '',
      userImg: '',
      userID: 0,
      posts: [],
      followedPosts: []
    }
  }

  grabPostInfo(array, id) {
    for (var y = 0; y < array.length; y++) {
      if (array[0].id === id) {
        return array[y];
      }
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

      axios.all([
        axios.get('/api/getOurPosts/' + res.data.id),
        axios.get('/api/getFollowedUsers/' + res.data.id)
      ])
      .then(axios.spread((ourPostsRes, followedUsersRes) => {
        this.setState({
          posts: [...ourPostsRes.data]
        });

        for (var y = 0; y < followedUsersRes.data.length; y++) {
          axios.get('/api/getOurPosts/' + followedUsersRes.data[y].followed_user_id)
          .then(posts => {
            this.setState({
              followedPosts: [...posts.data]
            });
          });
        }
      }));
    });
  }

  handleClickView(i, event) {
    this.props.dispatch(updatePostId(i));
  }

  objSplice(bookmarks, id) {
    let index;

    for (var y = 0; y < bookmarks.length; y++) {
      if (bookmarks[y].id === id) {
        index = y;
      }
    }
    bookmarks.splice(index, 1);
  }

  handleClickDelete(i, event) {
    axios.delete('/api/deletePost/' + this.state.userID + '/' + i);

    let updatedPosts = this.state.posts;
    this.objSplice(updatedPosts, i);
    this.setState({
      posts: updatedPosts
    });
  }

  handleClickSave(i, event) {
    let selectedPost = this.state.posts.filter(post => {
      return post.id === i;
    });
    axios.post('/api/createBookmark', {user_id: this.state.userID, post_id: i});
  }

  handleClickEdit(i, event) {
    this.props.dispatch(updatePostId(i));
  }

  render() {
    console.log(this.state.posts);
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
                      <Link to={`/editpost/${arr[i].post_title}/${arr[i].post_intro}/${arr[i].post_body}`} onClick={this.handleClickEdit.bind(this, arr[i].id)} className="Post-item view-button"><li>Edit</li></Link>
                      <li onClick={this.handleClickDelete.bind(this, arr[i].id)} className="Post-item delete-button">Delete</li>
                      {/* { this.props.userID ? <li onClick={this.handleClickSave.bind(this, arr[i].id)} className="Post-item save-button">Save</li> : null } */}
                    </div>
                  </ul>
                </div>
              </div>
      );
    });

    let followedUserPosts = this.state.followedPosts.map((e, i, arr) => {
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
                      <li onClick={this.handleClickSave.bind(this, arr[i].id)} className="Post-item save-button">Save</li>
                    </div>
                  </ul>
                </div>
              </div>
      );
    });

    this.props.dispatch(updateUserId(userID));

    return (
      <div className="profile">
        <div className="headings">
          <h1 className="user-name">{userName}</h1>
          <h1 className="user-posts-heading">Your Posts</h1>
          <h1 className="followed-user-posts-heading">Followed Posts</h1>
        </div>
        <div className="content">
          <div className="img">
            { userImg ? <img src={userImg} className="profile-img" /> : <img src={ninja} className="profile-img" /> }
          </div>
          <div className="user-posts">
            <div className="Posts">{userPosts}</div>
          </div>
          <div className="followed-user-posts">
            <div className="Posts">{followedUserPosts}</div>
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