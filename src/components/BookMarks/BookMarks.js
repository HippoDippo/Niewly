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
      bookmarks: [],
      userID: 0
    }

    // this.getAllSavedPosts = this.getAllSavedPosts.bind(this);
  }

  // getAllSavedPosts(bookmarksRes) {
  //   let bookmarks = [], bookmarkIds = [];
  //   for (var y = 0; y < bookmarksRes.data.length; y++) {
  //     axios.get('/api/getPost/' + bookmarksRes.data[y].post_id)
  //     .then(postsRes => {
  //       console.log(postsRes, ' ', y);
  //       if (y > 0 && !bookmarkIds.includes(postsRes.data[0].id)) { // Prevent same posts from being saved more than once.
  //         bookmarkIds.push(postsRes.data[0].id);
  //         bookmarks.push(postsRes.data[0])
  //         this.setState({
  //           bookmarks: [...bookmarks]
  //         });
  //       }
  //     });
  //   }
  // }

  objSplice(bookmarks, id) {
    let index;

    for (var y = 0; y < bookmarks.length; y++) {
      if (bookmarks[y].id === id) {
        index = y;
      }
    }
    bookmarks.splice(index, 1);
  }

  componentDidMount() {
    let userBookmarks = [], bookmarkIds = [];
    axios.get('/api/getBookmarks/' + this.props.userID)
    .then(bookmarksRes => {
      for (var y = 0; y < bookmarksRes.data.length; y++) {
        axios.get('/api/getPost/' + bookmarksRes.data[y].post_id)
        .then(post => {
          if (post.data.length !== 0) {
            if (y > 0 && !bookmarkIds.includes(post.data[0].id)) {
              bookmarkIds.push(post.data[0].id);
              userBookmarks.push(post.data[0]);
              this.setState({
                bookmarks: [...userBookmarks]
              });
            }
          }
        });
      }
    });
  }

  handleClickDelete(i, event) {
    axios.delete('/api/deleteBookmark/' + this.props.userID + '/' + i);

    let updatedBookmarks = this.state.bookmarks;
    this.objSplice(updatedBookmarks, i);
    this.setState({
      bookmarks: updatedBookmarks
    });
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