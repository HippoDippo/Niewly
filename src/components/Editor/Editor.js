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
    axios.post('/api/createPost', { user_id: this.state.userID, title: post.title, intro: post.intro, author: this.state.author, body: post.body })
  }

  render() {

    return (
      <div className="editor-page">
        <div className="editor">
          <div>
            <textarea value={this.state.editorInput} onChange={(e) => this.handleEditorInput(e)} className="input"/>
          </div>
          <div>
            <button onClick={this.handleEditorClick} className="button">Post</button>
          </div>
        </div>
        <div className="editor-instructions">
          <h1 className="editor-instructions-heading">How to use the Editor:</h1>
          <ul id="instructions-list">
            <li>Title ---> # This is our Title #</li>
            <li>Intro ---> ## This is our Intro ##</li>
            <li>Body ---> The body comes after the Intro, and does not require any special characters.</li>
            <li>Code Blocks ---> {'<<'} function greet() {'{'} console.log('Hello!'); } {'>>'} (Code Blocks are in the Body.)</li>
          </ul>

          <h1 className="post-example-heading">Complete Post Example:</h1>
          <div className="post-example">
            <p># Node.js Streams #<br />
               ## Why they are awesome ##<br />
              Node Streams are awesome because... blah blah blah, here is some code:<br />
              {'<<'} request.pipe(transform).pipe(response) {'>>'}
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default Editor;