import React from 'react';
import './EditPost.css';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';

class EditPost extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      post_id: this.props.match.params.post_id,
      post_title: this.props.match.params.post_title,
      post_intro: this.props.match.params.post_intro,
      post_body: this.props.match.params.post_body
    };

    this.handleTitleUpdate = this.handleTitleUpdate.bind(this);
    this.handleIntroUpdate = this.handleIntroUpdate.bind(this);
    this.handleBodyUpdate = this.handleBodyUpdate.bind(this);
    this.handleUpdateClick = this.handleUpdateClick.bind(this);
  }

  handleTitleUpdate(event) {
    this.setState({
      post_title: '#' + event.target.value + '#'
    });
  }

  handleIntroUpdate(event) {
    this.setState({
      post_intro: '##' + event.target.value + '##'
    });
  }

  handleBodyUpdate(event) {
    this.setState({
      post_body: event.target.value
    });
  }

  handleUpdateClick() {
    axios.put('/api/editPost', { id: this.state.post_id, post_title: this.state.post_title, post_intro: this.state.post_intro, post_body: this.state.post_body });
  }

  render() {
    return (
      <div className="edit-post">
        <div className="edit-post-title">
          <label>Title</label>
          <input onChange={(e) => this.handleTitleUpdate(e)} value={this.state.post_title} />
        </div>
        <div className="edit-post-intro">
          <label>Intro</label>
          <input onChange={(e) => this.handleIntroUpdate(e)} value={this.state.post_intro} />
        </div>
        <div className="edit-post-body">
          <label>Body</label>
          <textarea onChange={(e) => this.handleBodyUpdate(e)} value={this.state.post_body} />
        </div>
        <div className="edit-post-buttons">
          <Link onClick={this.handleUpdateClick} to="/profile">Update Post</Link>
          <Link to="/profile">Nevermind</Link>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    postID: state.postID
  };
}

export default connect(mapStateToProps)(EditPost);