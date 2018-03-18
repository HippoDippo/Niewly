import React from 'react';
import './Feed.css';
import Posts from '../Posts/Posts';

class Feed extends React.Component {
  render() {
    return (
      <div className="feed">
        <h1>Feed</h1>
        <Posts />
      </div>
    );
  }
}

export default Feed;