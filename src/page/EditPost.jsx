import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../supabase';
import '../App.css';

const EditPost = () => {
  const { postId } = useParams();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [notification, setNotification] = useState({ type: null, message: '' });

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

        setTitle(data.title);
        setContent(data.textual_content);
        setImageUrl(data.image_url);
      } catch (error) {
        console.error('Error fetching post details:', error.message);
      }
    };

    fetchPostDetails();
  }, [postId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await supabase
        .from('Posts')
        .update({ title, textual_content: content, image_url: imageUrl })
        .eq('id', postId);
      setNotification({ type: 'success', message: 'Post updated successfully!' });
    } catch (error) {
      console.error('Error updating post:', error.message);
      setNotification({ type: 'error', message: 'Failed to update post. Please try again.' });
    }
  };

  return (
    <div className='create-form'>
      <h2>Edit Post</h2>
      {notification.message && (
        <div className={`notification ${notification.type}`}>
          {notification.message}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <input
          className="input-field"
          type='text'
          placeholder='Title'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          className="textarea-field"
          placeholder='Content (Optional)'
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
        <input
          className="input-field"
          type='url'
          placeholder='Image URL (Optional)'
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        />
        <button className="submit-button" type='submit'>Submit</button>
      </form>
    </div>
  );
};

export default EditPost;
