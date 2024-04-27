import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../supabase'; // Import supabase client
import '../App.css';

const PostDetails = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchPostDetails = async () => {
      try {
        const { data, error } = await supabase
          .from('Posts')
          .select('*')
          .eq('id', postId)
          .single();

        if (error) {
          throw error;
        }

        setPost(data);
      } catch (error) {
        console.error('Error fetching post details:', error.message);
      }
    };

    fetchPostDetails();
  }, [postId]);

  if (!post) {
    return <div>Loading...</div>;
  }

  const handleUpvoteInPost = async (postId) => {
    try {
      // Update the upvotes for the specific post in the database
      const { data, error } = await supabase
        .from('Posts')
        .update({ upvotes: post.upvotes + 1 })
        .eq('id', postId);

      if (error) {
        throw error;
      }

      // Update the local state with the updated upvote count
    setPost({ ...post, upvotes: post.upvotes + 1 });
    } catch (error) {
      console.error('Error upvoting post:', error.message);
    }
  };

  
  return (
    <div className='post-content'>
      <h2>{post.title}</h2>
      {post.textual_content && <p>{post.textual_content}</p>}
      {post.image_url && <img src={post.image_url} alt="Post Image" />}
      <p>{post.upvotes} Upvotes</p>
      <button onClick={() => handleUpvoteInPost(post.id)}>Upvote</button>
    </div>
  );
};

export default PostDetails;
