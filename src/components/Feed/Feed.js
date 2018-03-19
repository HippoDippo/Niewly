import React from 'react';
import './Feed.css';
import Posts from '../Posts/Posts';

class Feed extends React.Component {
  render() {
    return (
      <div className="feed">
        <Posts />
      </div>
    );
  }
}

export default Feed;