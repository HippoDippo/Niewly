import React from 'react';
import './Feed.css';
import Posts from '../Posts/Posts';

function Feed(props) {
  return (
    <div className="feed">
      <Posts />
    </div>
  );
}

export default Feed;