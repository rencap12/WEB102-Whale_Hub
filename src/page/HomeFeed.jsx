import React, { useState, useEffect } from 'react';

const HomeFeed = ({ posts }) => {
  const [sortedPosts, setSortedPosts] = useState([]);
  const [sortBy, setSortBy] = useState('createdTime');

  useEffect(() => {
    sortPosts();
  }, [posts, sortBy]);

  const sortPosts = () => {
    const sorted = [...posts].sort((a, b) => {
      if (sortBy === 'createdTime') {
        return new Date(b.createdTime) - new Date(a.createdTime);
      } else {
        return b.upvotes - a.upvotes;
      }
    });
    setSortedPosts(sorted);
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  return (
    <div>
      <select value={sortBy} onChange={handleSortChange}>
        <option value="createdTime">Sort by Created Time</option>
        <option value="upvotes">Sort by Upvotes</option>
      </select>
      <ul>
        {sortedPosts.map((post) => (
          <li key={post.id}>
            <div>
              <p>{post.title}</p>
              <p>{post.createdTime}</p>
              <p>{post.upvotes} upvotes</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HomeFeed;
