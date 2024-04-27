import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '../supabase'; // Import supabase client
import Comments from '../components/Comments';
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
    return <div className='loader'></div>;
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

  const calculateHoursDifference = (createdAt) => {
    const createdTime = new Date(createdAt);
    const currentTime = new Date();
    const timeDifference = currentTime - createdTime;
    const hoursDifference = Math.floor(timeDifference / (1000 * 60 * 60)); // Convert milliseconds to hours
    return hoursDifference;
  };

  const handleDeletePost = async () => {
    try {
      // Delete the post from the database
      await supabase.from('Posts').delete().eq('id', postId);
      // Redirect the user to the home page after successful deletion
      window.location.href = '/'; // Navigate to the home page
    } catch (error) {
      console.error('Error deleting post:', error.message);
    }
  };
  
  return (
    <div className='post-content post-details-container'>
      <p>{calculateHoursDifference(post.created_at)} hours ago</p>
      <h2>{post.title}</h2>
      {post.textual_content && <p>{post.textual_content}</p>}
      {post.image_url && <img src={post.image_url} alt="Post Image" />}
      <p>{post.upvotes ? post.upvotes : 0} Upvotes</p>
      <Comments postId={postId}/>
      <div className='selection-of-buttons'>
        <button onClick={() => handleUpvoteInPost(post.id)} className='edit-button'>Upvote</button>
        <Link to={`/posts/${post.id}/edit`} className="edit-button">Edit</Link>
        <button onClick={handleDeletePost} className="edit-button">Delete</button>
      </div>
    </div>
  );
};

export default PostDetails;
