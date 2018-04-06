import React from 'react';
import './FollowedUserPosts.css';
import axios from 'axios';

class FollowedUserPosts extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      followedUsers: [],
      posts: []
    };
  }

  componentDidMount() {
    console.log(this.props.userID); // User Id is not getting there fast enough.
    axios.get('/api/getFollowedUsers/' + this.props.userID)
    .then(res => {
      console.log(res);
      for (var y = 0; y < res.data.length; y++) {
        axios.get('/api/getPosts/' + res.data[y].followed_user_id)
        .then(posts => {
          this.setState({
            posts: [...posts]
          });
        });
      }
    });
  }

  render() {
    // console.log(this.state.posts);
    // let posts = this.state.posts.map((e, i, arr) => {
    //   return
    // });

    return (
      <div className="followed-user-posts">
        {/* { posts } */}
        <h1>Followed User Posts</h1>
      </div>
    );
  }
}

export default FollowedUserPosts;