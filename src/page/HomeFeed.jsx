import React, { useState, useEffect } from 'react';
import { supabase } from '../supabase'; // Import supabase client
import Post from '../components/Posts'; // Import the Post component
import { Link } from 'react-router-dom';
import '../App.css';

const HomeFeed = ({ searchQuery, setSearchQuery }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data, error } = await supabase
          .from('Posts')
          .select('*');

        if (error) {
          throw error;
        }
      
        // Filter posts by title if search query is provided
        let filteredData = data;
        if (searchQuery) {
          filteredData = data.filter(post => post.title.toLowerCase().includes(searchQuery.toLowerCase()));
        }

        setPosts(filteredData);
      } catch (error) {
        console.error('Error fetching posts:', error.message);
      }
    };

    fetchPosts();
  }, [searchQuery]);
  
  const handleSortByNewest = () => {
    const sortedPosts = [...posts].sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    setPosts(sortedPosts);
  };

  const handleSortByMostPopular = () => {
    const sortedPosts = [...posts].sort((a, b) => b.upvotes - a.upvotes);
    setPosts(sortedPosts);
  };


  return (
    <div className="home-feed-container">
      <h2 className="home-feed-title">Home Feed</h2>
      <div className="sort-buttons">
        <button onClick={handleSortByNewest}>Newest</button>
        <button onClick={handleSortByMostPopular}>Most Popular</button>
      </div>
      <ul className="post-list">
        {posts.map((post) => (
          <Link to={`/posts/${post.id}`} key={post.id} style={{ textDecoration: 'none', color: 'inherit' }}>
            <Post post={post} />
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default HomeFeed;
