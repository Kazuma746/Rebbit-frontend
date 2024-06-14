// src/components/PostContent.js

import React, { useState, useEffect } from 'react';
import { Typography, Box, Chip, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, Tooltip, Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import axios from 'axios';

const PostContent = ({ post, user, handleDelete, handleEdit }) => {
  const [open, setOpen] = useState(false);
  const [upvoted, setUpvoted] = useState(post.upvotedBy.includes(user?._id));
  const [upvotes, setUpvotes] = useState(post.upvotes);
  const [postUser, setPostUser] = useState(null);

  useEffect(() => {
    const fetchPostUser = async () => {
      if (post.user && typeof post.user === 'string') {
        try {
          const res = await axios.post('http://localhost:5000/api/users/by-ids', { ids: [post.user] });
          setPostUser(res.data[0]);
        } catch (err) {
          console.error('Erreur lors de la récupération de l\'utilisateur', err);
        }
      } else {
        setPostUser(post.user);
      }
    };
    fetchPostUser();
  }, [post.user]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleConfirmDelete = () => {
    handleDelete();
    handleClose();
  };

  const handleUpvote = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.put(`http://localhost:5000/api/posts/upvote/${post._id}`, {}, {
        headers: {
          'x-auth-token': token,
        }
      });
      setUpvoted(!upvoted);
      setUpvotes(res.data.upvotes);
    } catch (err) {
      console.error('Error upvoting post:', err.response ? err.response.data : 'Network error');
    }
  };

  return (
    <>
      <Box sx={{ textAlign: 'center', mb: 2 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          {post.title}
        </Typography>
        <Typography variant="subtitle1" color="textSecondary">
          Posté par {postUser ? postUser.pseudo : 'Utilisateur inconnu'} le {new Date(post.date_created).toLocaleDateString()} à {new Date(post.date_created).toLocaleTimeString()}
        </Typography>
        {post.date_edited && (
          <Typography variant="subtitle2" color="textSecondary">
            Modifié le {new Date(post.date_edited).toLocaleDateString()} à {new Date(post.date_edited).toLocaleTimeString()}
          </Typography>
        )}
      </Box>
      <Box sx={{ mb: 2, position: 'relative' }}>
        {user && (user.role === 'admin' || user._id === post.user._id || user._id === post.user.toString()) && (
          <Box sx={{ position: 'absolute', top: 0, right: 0 }}>
            <Tooltip title="Éditer">
              <IconButton color="primary" onClick={handleEdit}>
                <EditIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Supprimer">
              <IconButton color="secondary" onClick={handleClickOpen}>
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          </Box>
        )}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Tooltip title="Upvote">
            <IconButton color="default" onClick={handleUpvote}>
              <ArrowUpwardIcon style={{ filter: upvoted ? 'invert(50%) sepia(100%) saturate(1000%) hue-rotate(190deg)' : 'none' }} />
            </IconButton>
          </Tooltip>
          <Typography variant="caption" color="textSecondary" sx={{ ml: 1 }}>
            Upvotes: {upvotes}
          </Typography>
        </Box>
        {post.images && post.images.length > 0 && (
          <img 
            src={`http://localhost:5000/uploads/${post.images[0]}`} 
            alt="Post" 
            style={{ width: '100%', maxHeight: '400px', objectFit: 'cover', cursor: 'pointer' }} 
            onClick={() => window.open(`http://localhost:5000/uploads/${post.images[0]}`, '_blank')} 
          />
        )}
      </Box>
      <Box sx={{ mb: 2 }}>
        <Typography variant="body1" component="div" sx={{ whiteSpace: 'pre-line' }}>
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
        </Typography>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', mb: 2 }}>
        {post.tags.map((tag) => (
          <Chip key={tag} label={tag} sx={{ mr: 1, mb: 1 }} />
        ))}
      </Box>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Confirmer la suppression</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Êtes-vous sûr de vouloir supprimer ce post ? Cette action est irréversible.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Annuler
          </Button>
          <Button onClick={handleConfirmDelete} color="secondary">
            Confirmer
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default PostContent;
