import React from 'react';
import './PostView.css';
import { connect } from 'react-redux';
import axios from 'axios';
import { Link } from 'react-router-dom';

import Rozetta from '../Rozetta/Rozetta';

class PostView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      postTitle: '',
      postIntro: '',
      postBody: '',
      postAuthor: ''
    }
  }

  componentDidMount() {
    axios.get('/api/getPost/' + this.props.id)
    .then(res => {
      this.setState({
        postTitle: res.data[0].post_title,
        postIntro: res.data[0].post_intro,
        postBody: res.data[0].post_body,
        postAuthor: res.data[0].post_author
      });
    });
  }

  render() {
    return (
      <div className="post-view">
        <div className="post">
          <h1>{this.state.postTitle}</h1>
          <h2>{this.state.postIntro}</h2>
          <Rozetta body={this.state.postBody} />
          <p>Author: {this.state.postAuthor}</p>
          <button>Save</button>
          <Link to="/">Back</Link>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    id: state.postID
  };
}

export default connect(mapStateToProps)(PostView);