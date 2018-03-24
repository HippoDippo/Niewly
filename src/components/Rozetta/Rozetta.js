// Author: Kaycee Ingram
import React from 'react';
import './Rozetta.css';

class Rozetta extends React.Component {
  constructor(props) {
    super(props);

    this.getIndexes = this.getIndexes.bind(this);
    this.getBodys = this.getBodys.bind(this);
    this.getCodeBlocks = this.getCodeBlocks.bind(this);
    this.rozetta = this.rozetta.bind(this);
  }


  getNumberOfCodeblocks(text) {
    var text2 = text.split('')
      , codeBlockCount = 0;

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
    var indexes = this.makeIndexArray(this.getNumberOfCodeblocks(text));

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
    var postBodys = []
      , y = 0;

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

  rozetta(body) {
    var sections = []
      , bodies = this.getBodys(body, this.getIndexes(body))
      , codeBlocks = this.getCodeBlocks(body, this.getIndexes(body));

    if (!body.includes('<<')) {
      return (
        <div className="post-body-sections">
          {body}
        </div>
      );
    }

    for (var y = 0; y < bodies.length; y++) {
      sections.push(<div className="post-body-section">
                      <h3 className="post-body">{bodies[y]}</h3>
                      <h3 className="code-block">{codeBlocks[y]}</h3>
                    </div>
      );
    }

    return (
      <div className="post-body-sections">
        {sections}
      </div>
    );
  }

  render() {

    let bodySections = this.rozetta(this.props.body);

    return (
      <div className="body">
        { bodySections ? bodySections : this.props.body }
      </div>
    );
  }
}

export default Rozetta;