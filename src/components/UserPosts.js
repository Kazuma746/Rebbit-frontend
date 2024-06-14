import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Table, TableBody, TableCell, TableHead, TableRow, Typography, IconButton, Tooltip, Box } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';

const UserPosts = ({ userId }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const postsRes = await axios.get(`http://localhost:5000/api/users/${userId}/posts`, {
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
        await axios.delete(`http://localhost:5000/api/posts/${postId}`, {
          headers: { 'x-auth-token': localStorage.getItem('token') }
        });
        setPosts(posts.filter(post => post._id !== postId));
      } catch (err) {
        console.error('Erreur lors de la suppression du post', err);
      }
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
