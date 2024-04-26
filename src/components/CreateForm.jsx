import React, { useState } from 'react';

const CreateForm = ({ onSubmit }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ title, content, imageUrl });
    setTitle('');
    setContent('');
    setImageUrl('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="text" 
        placeholder="Title" 
        value={title} 
        onChange={(e) => setTitle(e.target.value)} 
        required 
      />
      <textarea 
        placeholder="Content (Optional)" 
        value={content} 
        onChange={(e) => setContent(e.target.value)} 
      />
      <input 
        type="url" 
        placeholder="Image URL (Optional)" 
        value={imageUrl} 
        onChange={(e) => setImageUrl(e.target.value)} 
      />
      <button type="submit">Create Post</button>
    </form>
  );
};

export default CreateForm;
