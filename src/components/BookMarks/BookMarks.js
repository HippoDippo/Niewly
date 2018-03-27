import React from 'react';
import './BookMarks.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class BookMarks extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      bookmarks: []
    }
  }

  componentDidMount() {
    axios.get('/api/getBookmarks/' + this.props.userID)
    .then(bookmarksRes => {
      axios.get('/api/getPost/' + bookmarksRes.data[0].post_id)
      .then(postsRes => {
        this.setState({
          bookmarks: [...postsRes.data]
        });
      });
    });
  }

  handleClickDelete(i, event) {
    let selectedPost = this.state.posts.filter(post => {
      return post.id === i;
    });
    axios.delete('/api/deleteBookmark', {user_id: this.props.userID, post_id: i});
  }

  handleClickView(i, event) {
    this.props.dispatch(updatePostId(i));
  }

  render() {

    let userBookmarks = this.state.bookmarks.map((e, i, arr) => {
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
                      <li onClick={this.handleClickDelete.bind(this, arr[i].id)} className="Post-item delete-button">Delete</li>
                    </div>
                  </ul>
                </div>
              </div>
      );
    });

    return (
      <div className="bookmarks">
        {userBookmarks}
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

export default connect(mapStateToProps)(BookMarks);