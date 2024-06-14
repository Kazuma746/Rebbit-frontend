// src/components/Comments.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Typography, Box, TextField, Button, MenuItem, Select } from '@mui/material';
import Comment from './Comment';

const Comments = ({ postId, token, user, onDeleteComment }) => { // Ajout de onDeleteComment ici
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [sortOrder, setSortOrder] = useState('date'); // Par défaut, tri par date

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/comments/${postId}`);
        setComments(res.data);
      } catch (err) {
        console.error('Error fetching comments:', err.response ? err.response.data : 'Network error');
      }
    };

    fetchComments();
  }, [postId]);

  const handleCommentSubmit = async () => {
    if (!newComment) return;

    try {
      const res = await axios.post(
        'http://localhost:5000/api/comments',
        { content: newComment, post: postId },
        {
          headers: {
            'x-auth-token': token,
          }
        }
      );
      setComments([res.data, ...comments]);
      setNewComment('');
    } catch (err) {
      console.error('Error creating comment:', err.response ? err.response.data : 'Network error');
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      await axios.delete(`http://localhost:5000/api/comments/${commentId}`, {
        headers: {
          'x-auth-token': token,
        }
      });
      setComments(comments.filter(comment => comment._id !== commentId));
      if (onDeleteComment) {
        onDeleteComment(); // Appeler onDeleteComment ici
      }
    } catch (err) {
      console.error('Error deleting comment:', err.response ? err.response.data : 'Network error');
    }
  };

  const handleEditComment = async (commentId, content) => {
    try {
      const res = await axios.put(
        `http://localhost:5000/api/comments/${commentId}`,
        { content },
        {
          headers: {
            'x-auth-token': token,
          }
        }
      );
      const updatedComment = {
        ...res.data,
        user: comments.find(comment => comment._id === commentId).user
      };
      setComments(comments.map(comment => (comment._id === commentId ? updatedComment : comment)));
    } catch (err) {
      console.error('Error editing comment:', err.response ? err.response.data : 'Network error');
    }
  };

  const handleUpvoteComment = async (commentId) => {
    try {
      const res = await axios.put(
        `http://localhost:5000/api/comments/upvote/${commentId}`,
        {},
        {
          headers: {
            'x-auth-token': token,
          }
        }
      );
      setComments(comments.map(comment => (comment._id === commentId ? res.data : comment)));
    } catch (err) {
      console.error('Error upvoting comment:', err.response ? err.response.data : 'Network error');
    }
  };

  const handleSortChange = (event) => {
    setSortOrder(event.target.value);
  };

  const sortedComments = [...comments].sort((a, b) => {
    if (sortOrder === 'upvotes') {
      return b.upvotes - a.upvotes;
    }
    return new Date(b.date_created) - new Date(a.date_created);
  });

  return (
    <>
      <Typography variant="h5" component="h2" gutterBottom>
        Commentaires
      </Typography>
      <Box sx={{ mb: 2 }}>
        <Select
          value={sortOrder}
          onChange={handleSortChange}
          displayEmpty
          inputProps={{ 'aria-label': 'Sort Comments' }}
          sx={{ mb: 2 }}
        >
          <MenuItem value="date">Trier par date</MenuItem>
          <MenuItem value="upvotes">Trier par upvotes</MenuItem>
        </Select>
      </Box>
      {token ? (
        <Box sx={{ mb: 2 }}>
          <TextField
            label="Ajouter un commentaire"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            variant="outlined"
            margin="normal"
            fullWidth
            multiline
            rows={4}
          />
          <Button variant="contained" color="primary" onClick={handleCommentSubmit}>
            Commenter
          </Button>
        </Box>
      ) : (
        <Typography variant="body2" color="textSecondary">
          Veuillez vous connecter pour commenter.
        </Typography>
      )}
      {sortedComments.length > 0 ? (
        sortedComments.map((comment) => (
          <Comment
            key={comment._id}
            comment={comment}
            user={user}
            handleDeleteComment={handleDeleteComment}
            handleEditComment={handleEditComment}
            handleUpvoteComment={handleUpvoteComment}
          />
        ))
      ) : (
        <Typography variant="body2" color="textSecondary">
          Aucun commentaire pour l'instant.
        </Typography>
      )}
    </>
  );
};

export default Comments;
