import React from 'react';
import '../App.css';

const Post = ({ post }) => {
  const calculateHoursDifference = (createdAt) => {
    const createdTime = new Date(createdAt);
    const currentTime = new Date();
    const timeDifference = currentTime - createdTime;
    const hoursDifference = Math.floor(timeDifference / (1000 * 60 * 60)); // Convert milliseconds to hours
    return hoursDifference;
  };
  
  
  return (
    <li className="post-item">
        <div className="post-content">
          <h3>{post.title}</h3>
          <p>{post.upvotes ? post.upvotes : 0} Upvotes</p>
          <p>{calculateHoursDifference(post.created_at)} hours ago</p>
        </div>
    </li>
  );
};

export default Post;
