import React from 'react';
import './Posts.css';
import axios from 'axios';
import { connect } from 'react-redux';
import { updatePostId, updateBackBtnRoute } from '../../ducks/reducer';
import { Link } from 'react-router-dom';
import magnifyGlass from '../../img/mag.png';

class Posts extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      posts: [],
      userID: 0
    }

    this.handleSearchInput = this.handleSearchInput.bind(this);
  }

  componentDidMount() {
    // If user is logged in.
    if (this.props.userID)
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
    // If user is not logged in.
    else
      axios.get('/api/getPosts')
      .then(res => {
        this.setState({
          posts: [...res.data]
        });
      });
  }

  handleSearchInput(event) {
    if (event.target.value) {
      let searchInput = event.target.value;
      axios.get('/api/searchposts/' + searchInput)
      .then(posts => {
        this.setState({
          posts: [...posts.data]
        });
      });
    } else {
      axios.get('/api/getPosts')
        .then(res => {
          this.setState({
            posts: [...res.data]
          });
        });
    }
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
                      { this.props.userID ? <li onClick={this.handleClickSave.bind(this, arr[i].id)} className="Post-item save-button">Save</li> : null }
                    </div>
                  </ul>
                </div>
              </div>
      );
    });

    return (
      <div className="Posts">
        <div className="search">
          <img className="search-img" src={magnifyGlass} />
          <input className="search-input"onChange={(e) => this.handleSearchInput(e)} />
        </div>
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