import React from 'react';
import './PostView.css';
import { connect } from 'react-redux';

class PostView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      postID: this.props.postID, // We get the id from redux.
      postTitle: '',
      postIntro: '',
      postBody: '',
      postAuthor: ''
    }
  }

  componentDidMount() {
    axios.get('/api/getPost', { postID: this.state.postID })
    .then(post => {
      this.setState({
        postTitle: post.post_title,
        postIntro: post.post_intro,
        postBody: post.post_body,
        postAuthor: post.post_author
      });
    });
  }

  render() {
    return (
      <div className="post-view">
        <div className="post">
          <h1>{this.state.postTitle}</h1>
          <h2>{this.state.postIntro}</h2>
          <h4>{this.state.postBody}</h4>
          <p>{this.state.postAuthor}</p>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    postID: postID
  };
}

export default connect(mapStateToProps)(PostView);