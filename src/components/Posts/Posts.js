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
      userID: 0
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
        userID: authRes.data.id
      });
    }));
  }

  handleClickSave(i, event) {
    let selectedPost = this.state.posts.filter(post => {
      return post.id === i;
    });
    axios.post('/api/createBookmark', {user_id: this.props.userID, post_id: i});
  }

  handleClickView(i, event) {
    this.props.dispatch(updatePostId(i));
  }

  render() {
    console.log('Render Method' + this.state.userID);
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
                      <li onClick={this.handleClickSave.bind(this, arr[i].id)} className="Post-item save-button">Save</li>
                    </div>
                  </ul>
                </div>
              </div>
      );
    });

    return (
      <div className="Posts">
        {userPosts}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    userID: state.userID,
    postID: state.postID
  }
}

export default connect(mapStateToProps)(Posts);