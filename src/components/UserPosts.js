// src/components/UserPosts.js  

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Table, TableBody, TableCell, TableHead, TableRow, Typography, IconButton, Tooltip, Select, MenuItem } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';

const UserPosts = ({ userId }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const postsRes = await axios.get(`https://rebbit-api.marksu.fr/api/users/${userId}/posts`, {
          headers: { 'x-auth-token': localStorage.getItem('token') }
        });
        setPosts(postsRes.data);
      } catch (err) {
        console.error('Error fetching posts:', err);
      }
    };
    fetchPosts();
  }, [userId]);

  const handleDeletePost = async (postId) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce post ?')) {
      try {
        await axios.delete(`https://rebbit-api.marksu.fr/api/posts/${postId}`, {
          headers: { 'x-auth-token': localStorage.getItem('token') }
        });
        setPosts(posts.filter(post => post._id !== postId));
      } catch (err) {
        console.error('Erreur lors de la suppression du post', err);
      }
    }
  };

  const handleStatusChange = async (postId, newState) => {
    try {
      await axios.put(`https://rebbit-api.marksu.fr/api/posts/state/${postId}`, { state: newState }, {
        headers: { 'x-auth-token': localStorage.getItem('token') }
      });
      setPosts(posts.map(post => post._id === postId ? { ...post, state: newState } : post));
    } catch (err) {
      console.error('Erreur lors de la mise à jour du post', err);
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h5" component="h2" gutterBottom>
        Mes posts
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Titre</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Tags</TableCell>
            <TableCell>État</TableCell>
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
              <TableCell>{post.tags.join(', ')}</TableCell>
              <TableCell>
                <Select
                  value={post.state}
                  onChange={(e) => handleStatusChange(post._id, e.target.value)}
                  displayEmpty
                  inputProps={{ 'aria-label': 'Changer l\'état du post' }}
                >
                  <MenuItem value="draft">Brouillon</MenuItem>
                  <MenuItem value="published">Publié</MenuItem>
                  <MenuItem value="archived">Archivé</MenuItem>
                </Select>
              </TableCell>
              <TableCell>
                <Tooltip title="Supprimer">
                  <IconButton onClick={() => handleDeletePost(post._id)}>
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Container>
  );
};

export default UserPosts;
