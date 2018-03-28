import React from 'react';
import './BookMarks.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { updatePostId } from '../../ducks/reducer';

class BookMarks extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      bookmarks: []
    }

    this.getAllSavedPosts = this.getAllSavedPosts.bind(this);
  }

  getAllSavedPosts(bookmarksRes) {
    for (var y = 0; y < bookmarksRes.data.length; y++) {
      axios.get('/api/getPost/' + bookmarksRes.data[y].post_id)
      .then(postsRes => {
        this.setState({
          bookmarks: [...postsRes.data]
        });
      });
    }
  }

  componentDidMount() {
    axios.get('/api/getBookmarks/' + this.props.userID)
    .then(bookmarksRes => {
      this.getAllSavedPosts(bookmarksRes);
    });
  }

  // componentDidMount() {
  //   axios.get('/api/getBookmarks/' + this.props.userID)
  //   .then(bookmarksRes => {
  //     let bookmarks = bookmarksRes.data.map((e, i, arr) => arr[i].post_id); // Get all post ids.
  //     axios.get('/api/getPost/' + bookmarks)
  //     .then(postsRes => {
  //       this.setState({
  //         bookmarks: [...postsRes.data]
  //       });
  //     });
  //   });
  // }

  handleClickDelete(i, event) {
    let selectedPost = this.state.bookmarks.filter(post => {
      return post.id === i;
    });
    axios.delete('/api/deleteBookmark', { user_id: this.props.userID, post_id: i });
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
      <div className="Posts">
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