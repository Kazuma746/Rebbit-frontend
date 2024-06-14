// src/components/PostCard.js

import React from 'react';
import { Card, CardContent, CardActions, Typography, Box, Button } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import parse from 'html-react-parser';
import Tag from './Tag';

const PostCard = ({ post, user, users }) => {
  const truncateContent = (content, maxLength = 200) => {
    return content.length > maxLength ? content.substring(0, maxLength) + '...' : content;
  };

  return (
    <Card sx={{ mb: 2, width: '100%' }}>
      <CardContent>
        <Typography variant="h5" component="h2">
          {post.title}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
          Posté par : {users[post.user] || 'Utilisateur inconnu'}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          le {new Date(post.date_created).toLocaleDateString()} à {new Date(post.date_created).toLocaleTimeString()}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          {parse(truncateContent(post.content))}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography variant="caption" color="textSecondary" sx={{ ml: 1 }}>
            Upvotes: {post.upvotes}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
          {post.tags.map((tag) => (
            <Tag key={tag} label={tag} />
          ))}
        </Box>
      </CardContent>
      <CardActions>
        <Button component={RouterLink} to={`/posts/${post._id}`} size="small">
          Lire la suite
        </Button>
      </CardActions>
    </Card>
  );
};

export default PostCard;
