import React from 'react';
import './Editor.css';

export default function Editor(props) {
  return (
    <div className="editor">
      <div className="editor-input">
        <textarea className="input"/>
      </div>
      <div className="editor-button">
        <button className="button">Post</button>
      </div>
    </div>
  );
}
