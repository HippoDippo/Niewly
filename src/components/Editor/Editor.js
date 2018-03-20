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

// function extractID(str) {
//   var start = str.indexOf('|');
//   return Number(str.slice(start+1, str.length-11));
// }