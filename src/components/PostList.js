// src/components/PostList.js

import React from 'react';
import PostCard from './PostCard';

const PostList = ({ posts, user, users }) => {
  return (
    <div>
      {posts.map((post) => (
        <PostCard key={post._id} post={post} user={user} users={users} />
      ))}
    </div>
  );
};

export default PostList;

