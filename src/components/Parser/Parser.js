import React from 'react';
import './Parser.css';

class Parser extends React.Component {

  // let text = 'The code below is awesome: <<var name = "Kaycee";>> This is our other codeblock <<var name = "Will";>>';

  getNumberOfCodeblocks(text) {
    text2 = text.split('');
    var codeBlockCount = 0;

    for (var y = 0; y < text2.length; y++) {
      if (text2[y] === '<' && text2[y+1] === '<') {
        codeBlockCount++;
      }
    }
    return codeBlockCount;
  }

  makeIndexArray(numberOfCodeBlocks) {
    var indexArray = [];

    for (var y = 0; y < numberOfCodeBlocks; y++) {
      indexArray.push([]);
    }
    return indexArray;
  }

  getIndexes(text) {
    var indexes = makeIndexArray(getNumberOfCodeblocks(text));

    for (var y = 0, x = 0; y < text.length; y++) {
      if (text[y] === '<' && text[y+1] === '<') {
        indexes[x].push(y+1);
      } else if (text[y] === '>' && text[y+1] === '>') {
        indexes[x].push(y);
        x++;
      }
    }
    return indexes;
  }

  getCodeBlocks(text, indexes) {
    var codeBlocks = [];

    for (var y = 0; y < indexes.length; y++) {
      codeBlocks.push(text.slice((indexes[y][0]) + 1, indexes[y][1]));
    }
    return codeBlocks;
  }

  getBodys(text, indexes) {
    var postBodys = [];

    var y = 0;
    while (postBodys.length < indexes.length) {
      if (y === 0) {
        postBodys.push(text.slice(0, indexes[y][0] - 2));
      } else {
        postBodys.push(text.slice(indexes[y - 1][1] + 3, indexes[y][0] - 2));
      }
      y++;
    }
    return postBodys;
  }

  render() {
    return (
      <div className="parser">
        <h1>Parser</h1>
      </div>
    );
  }
}

export default Parser;