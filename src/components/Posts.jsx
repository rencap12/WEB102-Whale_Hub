import React from 'react';

const Post = ({ post }) => {
  return (
    <li key={post.id} style={{ marginBottom: '20px' }}>
      <div>
        <p>{post.title}</p>
        <p>{post.created_at}</p>
        <p>{post.upvotes} upvotes</p>
        {post.image_url && (
          <img
            src={post.image_url}
            alt="Post Image"
            style={{ maxWidth: '400px', maxHeight: '400px', width: 'auto', height: 'auto' }}
          />
        )}
      </div>
    </li>
  );
};

export default Post;
