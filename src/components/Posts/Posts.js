import React from 'react';
import './Posts.css';
import axios from 'axios';
import { connect } from 'react-redux';
import { updatePostId } from '../../ducks/reducer';
import { Link } from 'react-router-dom';

class Posts extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      posts: [],
      userID: ''
    }
  }

  componentDidMount() {
    axios.all([
      axios.get('/api/getPosts'),
      axios.get('/auth/me')
    ])
    .then(axios.spread((postRes, authRes) => {
      this.setState({
        posts: [...postRes.data],
        userID: authRes.data.user_id
      });
    }));
  }

  // handleClickSave(i, event) {
  //   let selectedPost = this.state.posts.filter(post => {
  //     return post.id === i;
  //   });
  //   axios.post('/api/savedposts', {userID: this.state.userID, titleText: selectedPost[0].post_title, introText: selectedPost[0].post_intro, bodyText: selectedPost[0].post_body});
  //   axios.post('/api/bookmarks', {userID: this.state.userID, postID: selectedPost[0].id};
  // }

  handleClickView(i, event) {
    // When user clicks view button, set post id to redux store.
    // Then route to PostView component.
    this.props.dispatch(updatePostId(i));
  }

  render() {

    let userPosts = this.state.posts.map((e, i, arr) => {
      return (<div key={arr[i].id} id={arr[i].id} className="post">
                <h3 className="post-title">{arr[i].post_title}</h3>
                <h4 className="post-intro">{arr[i].post_intro}</h4>
                {/* <p className="post-body">{arr[i].post_body}</p> */}
                <p className="author">{arr[i].post_author}</p>
                {/* <button onClick={this.handleClickSave.bind(this, arr[i].id)} className="save-button">Save</button> */}
                <Link to="/postView" onClick={this.handleClickView.bind(this, arr[i].id)} className="view-button">View</Link>
              </div>
      );
    });

    return (
      <div className="posts">
        {userPosts}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    postID: state.postID
  }
}

export default connect(mapStateToProps)(Posts);