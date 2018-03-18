import React from 'react';
import './Editor.css';

export default function Editor(props) {
  return (
    <div className="editor">
      <div>
        <textarea className="input"/>
      </div>
      <div>
        <button className="button">Post</button>
      </div>
    </div>
  );
}
