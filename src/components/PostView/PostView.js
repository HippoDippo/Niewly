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
        postTitle: post.title,
        postIntro: post.intro,
        postBody: post.body,
        postAuthor: post.author
      });
    });
  }

  render() {
    return (
      <div className="post-view">
        <div className="post">
          <h1>{postTitle}</h1>
          <h2>{postIntro}</h2>
          <h4>{postBody}</h4>
          <p>{postAuthor}</p>
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