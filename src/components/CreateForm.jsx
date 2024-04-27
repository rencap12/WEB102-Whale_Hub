import React, { useState } from 'react';
import { supabase } from '../supabase'; // Import the Supabase client
import '../App.css';

const CreateForm = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [notification, setNotification] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      // Insert the new post into the 'Posts' table
      const { data, error } = await supabase
        .from('Posts')
        .insert({ title, textual_content: content, image_url: imageUrl });
  
      if (error) {
        throw error;
      }
  
      // Reset form fields after successful submission
      setTitle('');
      setContent('');
      setImageUrl('');
  
      // Set notification for successful creation
      setNotification({ type: 'success', message: 'Post created successfully!' });
    } catch (error) {
      console.error('Error creating post:', error.message);
  
      // Set notification for error
      setNotification({ type: 'error', message: 'Failed to create post. Please try again.' });
    }
  };
  

  return (
    <div className='create-form-contatiner'>
      <div className='notification_msg'>
        {notification && (
          <div className={`notification ${notification.type}`}>
            {notification.message}
          </div>
        )}
        <form className="create-form" onSubmit={handleSubmit}>
          <input 
            className="input-field" // Apply CSS class for input fields
            type="text" 
            placeholder="Title" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
            required 
          />
          <textarea 
            className="textarea-field" // Apply CSS class for textarea
            placeholder="Content (Optional)" 
            value={content} 
            onChange={(e) => setContent(e.target.value)} 
          />
          <input 
            className="input-field" // Apply CSS class for input fields
            type="url" 
            placeholder="Image URL (Optional)" 
            value={imageUrl} 
            onChange={(e) => setImageUrl(e.target.value)} 
          />
          <button className="create-submit-button" type="submit">Create Post</button>
        </form>
      </div>
    </div>
  );
};

export default CreateForm;
