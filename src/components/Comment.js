// src/components/Comment.js

import React, { useState, useEffect } from 'react';
import { Typography, Box, TextField, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, Tooltip } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';

const Comment = ({ comment, user, handleDeleteComment, handleEditComment, handleUpvoteComment }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(comment?.content || '');
  const [open, setOpen] = useState(false);
  const [showFullContent, setShowFullContent] = useState(false);
  const [hasUpvoted, setHasUpvoted] = useState(false);

  useEffect(() => {
    if (user && comment.upvotedBy.includes(user._id)) {
      setHasUpvoted(true);
    }
  }, [user, comment.upvotedBy]);

  if (!comment) {
    return null; // Return null if comment is undefined
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleConfirmDelete = () => {
    handleDeleteComment(comment._id);
    handleClose();
  };

  const handleEditSubmit = async () => {
    if (!editedContent) return;
    handleEditComment(comment._id, editedContent);
    setIsEditing(false);
  };

  const toggleContent = () => {
    setShowFullContent(!showFullContent);
  };

  const toggleUpvote = () => {
    handleUpvoteComment(comment._id);
    setHasUpvoted(!hasUpvoted);
  };

  const isContentLong = comment.content.length > 100;

  return (
    <Box sx={{ mb: 2, p: 2, border: '1px solid #ccc', borderRadius: '4px', position: 'relative', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="subtitle1" component="p">
          {comment.isDeleted ? 'Utilisateur supprimé' : comment.user.pseudo}
        </Typography>
        {user && (
          <Box>
            <Tooltip title="Upvote">
              <IconButton onClick={toggleUpvote}>
                <ArrowUpwardIcon
                  style={{
                    height: '24px',
                    marginRight: '10px',
                    color: hasUpvoted ? '#00f' : 'inherit' // Change color if upvoted
                  }}
                />
              </IconButton>
            </Tooltip>
            {(user.role === 'admin' || user._id === comment.user._id) && (
              <>
                <Tooltip title="Éditer">
                  <IconButton color="primary" onClick={() => setIsEditing(!isEditing)}>
                    <EditIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Supprimer">
                  <IconButton color="secondary" onClick={handleClickOpen}>
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
              </>
            )}
          </Box>
        )}
      </Box>
      <Box sx={{ flexGrow: 1 }}>
        {isEditing ? (
          <>
            <TextField
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
              variant="outlined"
              margin="normal"
              fullWidth
              multiline
              rows={4}
            />
            <Button variant="contained" color="primary" onClick={handleEditSubmit}>
              Enregistrer
            </Button>
            <Button variant="contained" color="secondary" onClick={() => setIsEditing(false)} sx={{ ml: 2 }}>
              Annuler
            </Button>
          </>
        ) : (
          <>
            <Typography variant="body2" component="p">
              {comment.isDeleted ? 'Commentaire supprimé' : showFullContent ? comment.content : `${comment.content.substring(0, 100)}${isContentLong ? '...' : ''}`}
            </Typography>
          </>
        )}
        <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
          <Typography variant="caption" color="textSecondary" sx={{ mr: 2 }}>
            Upvotes: {comment.upvotes}
          </Typography>
          <Typography variant="caption" color="textSecondary">
            Posté le {new Date(comment.date_created).toLocaleDateString()} à {new Date(comment.date_created).toLocaleTimeString()}
            {comment.date_edited && (
              <span> - Modifié</span>
            )}
          </Typography>
        </Box>
      </Box>
      {isContentLong && (
        <Button size="small" onClick={toggleContent} sx={{ alignSelf: 'flex-end' }}>
          {showFullContent ? 'Voir moins' : 'Voir plus'}
        </Button>
      )}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Confirmer la suppression</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Êtes-vous sûr de vouloir supprimer ce commentaire ? Cette action est irréversible.
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
    </Box>
  );
};

export default Comment;
