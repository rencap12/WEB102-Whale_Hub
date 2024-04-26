import React, { useState, useEffect } from 'react';
import {supabase} from '../supabase'; // Import supabase client
import Post from '../components/Posts'; // Import the Post component

const HomeFeed = () => {
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

        setPosts(data);
      } catch (error) {
        console.error('Error fetching posts:', error.message);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h2>Home Feed</h2>
      <ul style={{ padding: 0, listStyle: 'none' }}>
        {posts.map((post) => (
          <Post key={post.id} post={post} />
        ))}
      </ul>
    </div>
  );
};

export default HomeFeed;
