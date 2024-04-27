import React, { useState, useEffect } from 'react';
import { supabase } from '../supabase'; // Import supabase client

const Comments = ({ postId }) => {
  const [newComment, setNewComment] = useState('');
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const { data, error } = await supabase
          .from('Posts')
          .select('comments')
          .eq('id', postId)
          .single();

        if (error) {
          throw error;
        }

        setComments(data.comments || []);
      } catch (error) {
        console.error('Error fetching comments:', error.message);
      }
    };

    fetchComments();
  }, [postId]);

  const handleAddComment = async () => {
    try {
      const { data, error } = await supabase
        .from('Posts')
        .update({
          comments: [...comments, newComment]
        })
        .eq('id', postId);

      if (error) {
        throw error;
      }

      // Update comments state with the new comment
      setComments([...comments, newComment]);

      // Clear the input field
      setNewComment('');
    } catch (error) {
      console.error('Error adding comment:', error.message);
    }
  };

  return (
    <div className="comments-container">
      <h3>Comments</h3>
      <ul className="comments-list">
        {comments.map((comment, index) => (
          <li key={index} className="comment-item">
            {comment}
          </li>
        ))}
      </ul>
      <input
        type="text"
        className="comment-input"
        placeholder="Add a comment..."
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
      />
      <button className="comment-submit-button" onClick={handleAddComment}>Add Comment</button>
    </div>
  );
};

export default Comments;
