// frontend/src/pages/admin/UserDetail.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Typography, Box, TextField, Button, Table, TableBody, TableCell, TableHead, TableRow, IconButton, Tooltip } from '@mui/material';
import { Link as RouterLink, useParams } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';

const UserDetail = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [pseudo, setPseudo] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const userRes = await axios.get(`https://rebbit-api.marksu.fr/api/admin/users/${id}`, {
          headers: { 'x-auth-token': localStorage.getItem('token') }
        });
        setUser(userRes.data);
        setPseudo(userRes.data.pseudo);
        setEmail(userRes.data.email);

        const postsRes = await axios.get(`https://rebbit-api.marksu.fr/api/admin/users/${id}/posts`, {
          headers: { 'x-auth-token': localStorage.getItem('token') }
        });
        setPosts(postsRes.data);

        const commentsRes = await axios.get(`https://rebbit-api.marksu.fr/api/admin/users/${id}/comments`, {
          headers: { 'x-auth-token': localStorage.getItem('token') }
        });
        setComments(commentsRes.data);
      } catch (err) {
        console.error('Erreur lors de la récupération des détails de l\'utilisateur', err);
      }
    };
    fetchUserDetails();
  }, [id]);

  const handleEditUser = async () => {
    try {
      await axios.put(`https://rebbit-api.marksu.fr/api/admin/users/${id}`, { pseudo, email }, {
        headers: { 'x-auth-token': localStorage.getItem('token') }
      });
      setEditMode(false);
    } catch (err) {
      console.error('Erreur lors de la mise à jour de l\'utilisateur', err);
    }
  };

  const handleDeleteComment = async (commentId) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce commentaire ?')) {
      try {
        await axios.delete(`https://rebbit-api.marksu.fr/api/admin/comments/${commentId}`, {
          headers: { 'x-auth-token': localStorage.getItem('token') }
        });
        setComments(comments.filter(comment => comment._id !== commentId));
      } catch (err) {
        console.error('Erreur lors de la suppression du commentaire', err);
      }
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      {user && (
        <>
          <Typography variant="h4" component="h1" gutterBottom>
            Détails de l'utilisateur
          </Typography>
          {editMode ? (
            <Box sx={{ mb: 4 }}>
              <TextField
                label="Pseudo"
                value={pseudo}
                onChange={(e) => setPseudo(e.target.value)}
                variant="outlined"
                fullWidth
                sx={{ mb: 2 }}
              />
              <TextField
                label="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                variant="outlined"
                fullWidth
                sx={{ mb: 2 }}
              />
              <Button variant="contained" color="primary" onClick={handleEditUser} sx={{ mr: 2 }}>
                Enregistrer
              </Button>
              <Button variant="contained" color="secondary" onClick={() => setEditMode(false)}>
                Annuler
              </Button>
            </Box>
          ) : (
            <Box sx={{ mb: 4 }}>
              <Typography variant="h6" gutterBottom>
                Pseudo: {user.pseudo}
              </Typography>
              <Typography variant="h6" gutterBottom>
                Email: {user.email}
              </Typography>
              <Button variant="contained" color="primary" onClick={() => setEditMode(true)}>
                Éditer
              </Button>
            </Box>
          )}
          <Typography variant="h5" gutterBottom>
            Posts
          </Typography>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Titre</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {posts.map((post) => (
                <TableRow key={post._id}>
                  <TableCell>
                    <RouterLink to={`/posts/${post._id}`}>
                      {post.title}
                    </RouterLink>
                  </TableCell>
                  <TableCell>{new Date(post.date_created).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <Tooltip title="Supprimer">
                      <IconButton onClick={() => handleDeleteComment(post._id)}>
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
            Commentaires
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
        </>
      )}
    </Container>
  );
};

export default UserDetail;
