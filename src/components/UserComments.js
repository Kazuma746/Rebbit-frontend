// src/components/UserComments.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableHead, TableRow, IconButton, Tooltip, Box, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { Link as RouterLink } from 'react-router-dom';

const UserComments = ({ userId }) => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const commentsRes = await axios.get(`http://localhost:5000/api/users/${userId}/comments`, {
          headers: { 'x-auth-token': localStorage.getItem('token') }
        });
        setComments(commentsRes.data);
      } catch (err) {
        console.error('Error fetching comments:', err);
      }
    };
    fetchComments();
  }, [userId]);

  const handleDeleteComment = async (commentId) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce commentaire ?')) {
      try {
        await axios.delete(`http://localhost:5000/api/comments/${commentId}`, {
          headers: { 'x-auth-token': localStorage.getItem('token') }
        });
        setComments(comments.filter(comment => comment._id !== commentId));
      } catch (err) {
        console.error('Erreur lors de la suppression du commentaire', err);
      }
    }
  };

  return (
    <Box sx={{ my: 4 }}>
      <Typography variant="h5" component="h2" gutterBottom>
        Mes commentaires
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Commentaire</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {comments.map((comment) => (
            <TableRow key={comment._id}>
              <TableCell>
                <RouterLink to={`/posts/${comment.post}`}>
                  {comment.content}
                </RouterLink>
              </TableCell>
              <TableCell>{new Date(comment.date_created).toLocaleDateString()}</TableCell>
              <TableCell>
                <Tooltip title="Supprimer">
                  <IconButton onClick={() => handleDeleteComment(comment._id)}>
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
};

export default UserComments;
