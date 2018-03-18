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

// let text = 'The code below is awesome: <<var name = "Kaycee";>> This is our other codeblock <<var name = "Will";>>';

// function getNumberOfCodeblocks(text) {
//   text2 = text.split('');
//   var codeBlockCount = 0;

//   for (var y = 0; y < text2.length; y++) {
//     if (text2[y] === '<' && text2[y+1] === '<') {
//       codeBlockCount++;
//     }
//   }
//   return codeBlockCount;
// }

// function makeIndexArray(numberOfCodeBlocks) {
//   var indexArray = [];

//   for (var y = 0; y < numberOfCodeBlocks; y++) {
//     indexArray.push([]);
//   }
//   return indexArray;
// }

// function getIndexes(text) {
//   var indexes = makeIndexArray(getNumberOfCodeblocks(text));

//   for (var y = 0, x = 0; y < text.length; y++) {
//     if (text[y] === '<' && text[y+1] === '<') {
//       indexes[x].push(y+1);
//     } else if (text[y] === '>' && text[y+1] === '>') {
//       indexes[x].push(y);
//       x++;
//     }
//   }
//   return indexes;
// }

// function getCodeBlocks(text, indexes) {
//   var codeBlocks = [];

//   for (var y = 0; y < indexes.length; y++) {
//     codeBlocks.push(text.slice((indexes[y][0]) + 1, indexes[y][1]));
//   }
//   return codeBlocks;
// }

// function getBodys(text) {
//   var postBodys = [], start = 0;

//   for (var y = 0; y < text.length; y++) {
//     if (text[y] === '<') {
//       postBodys.push(text.slice(start, y));
//       y += 2;
//     }
//   }
//   return postBodys;
// }



// function chop(text, indexes) {
//   var postBodys, codeBlocks;

//   postBody1 = text.slice(0, indexes.startIndex-1);
//   postBody2 = text.slice(indexes.endIndex+3, text.length);
//   codeBlock = text.slice(indexes.startIndex+2, indexes.endIndex);

//   return {
//     postBody1,  // postBodys: ['This is our awesome code:', 'This is our other code block:', 'There is no code block here.']
//     postBody2,  // codeBlocks: { postBodys.indexOf('This is our awesome code:') : postBodys[postBodys.indexOf('This is our awesome code:')] }
//     codeBlock
//   };
// }

// function format(post) {
//   return (post.postBody1 + '\n' + post.codeBlock + '\n' + post.postBody2);
// }

// function create(text) {
//   var post = chop(text, getIndexes(text));
//   return format(post);
// }