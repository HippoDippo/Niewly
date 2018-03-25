import React from 'react';
import './Editor.css';
import axios from 'axios';

class Editor extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userID: 0,
      author: '',
      editorInput: '',
      post: ''
    };

    this.handleEditorInput = this.handleEditorInput.bind(this);
    this.handleEditorClick = this.handleEditorClick.bind(this);
    this.extractContents = this.extractContents.bind(this);
  }

  componentDidMount() {
    axios.get('/auth/me')
    .then(res => {
      this.setState({
        userID: res.data.id,
        author: res.data.user_name
      });
    });
  }

  // extractID(str) {
  //   var start = str.indexOf('|');
  //   return Number(str.slice(start+1, str.length-11));
  // }

  getTitleIndex(text) {
    var textCpy = text.split(' ');

    textCpy.shift(); // Remove first #.

    return {
      start: 1,
      end: textCpy.indexOf('#') + 1
    };
  }

  getIntroIndex(text) {
    var textCpy = text.split(' ')
      , start
      , end;

    for (var y = 0; y < 2; y++) {
      if (y === 0) {
        start = textCpy.indexOf('##');
        textCpy.splice(start, 1);
      } else {
        end = textCpy.indexOf('##');
      }
    }

    return {
      start: start+1,
      end: end+1
    };
  }

  getBodyIndex(text) {
    var textCpy = text.split(' ')
      , start;

    textCpy.splice(textCpy.indexOf('##'), 1); // Remove first ##.
    start = textCpy.indexOf('##') + 2;

    return {
      start: start,
      end: text.length - 1
    };
  }

  extractContents(text) {
    var titleIndexes = this.getTitleIndex(text)
     , introIndexes = this.getIntroIndex(text)
     , bodyIndexes = this.getBodyIndex(text)
     , textCpy = text.split(' ');

    var title = textCpy.slice(titleIndexes.start, titleIndexes.end)
      , intro = textCpy.slice(introIndexes.start, introIndexes.end)
      , body = textCpy.slice(bodyIndexes.start, bodyIndexes.end);

    return {
      title: title.join(' '),
      intro: intro.join(' '),
      body: body.join(' ')
    };
  }

  handleEditorInput(event) {
    this.setState({
      editorInput: event.target.value
    });
  }

  replaceAll(str, char, replaceChar) {
    while (str.includes(char)) str = str.replace(char, replaceChar);
    return str;
  }

  handleEditorClick() {
    let post = this.extractContents(this.replaceAll(this.state.editorInput, '\n', ' '));
    this.setState({
      editorInput: ''
    });
    console.log(post);
    axios.post('/api/createPost', { user_id: this.state.userID, title: post.title, intro: post.intro, author: this.state.author, body: post.body })
  }

  render() {

    return (
      <div className="editor">
        <div>
          <textarea value={this.state.editorInput} onChange={(e) => this.handleEditorInput(e)} className="input"/>
        </div>
        <div>
          <button onClick={this.handleEditorClick} className="button">Post</button>
        </div>
      </div>
    );
  }
}

export default Editor;