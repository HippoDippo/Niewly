import React from 'react';
import './Editor.css';
import axios from 'axios';

class Editor extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      editorInput: '',
      post: ''
    };

    this.handleEditorInput = this.handleEditorInput.bind(this);
    this.handleEditorClick = this.handleEditorClick.bind(this);
  }

  extractContents() {
    //

    return {
      title: '',
      intro: '',
      body: ''
    }
  }

  handleEditorInput(event) {
    this.setState({
      editorInput: event.target.value
    });
  }

  handleEditorClick() {
    this.setState({
      post: extractContents(this.state.editorInput)
    });
    let { post } = this.state.post;
    axios.post('/api/createPost', { title: post.title, intro: post.intro, etc })
  }

  render() {

    return (
      <div className="editor">
        <div>
          <textarea onChange={(e) => this.handleEditorInput(e)} className="input"/>
        </div>
        <div>
          <button onClick={this.handleEditorClick} className="button">Post</button>
        </div>
      </div>
    );
  }
}

// function extractID(str) {
//   var start = str.indexOf('|');
//   return Number(str.slice(start+1, str.length-11));
// }