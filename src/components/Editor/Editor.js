import React from 'react';
import './Editor.css';

export default function Editor(props) {
  return (
    <div className="editor">
      <div>
        <textarea {/*onChange={props.typing}*/} className="input"/>
      </div>
      <div>
        <button {/*onClick={props.post}*/} className="button">Post</button>
      </div>
    </div>
  );
}
