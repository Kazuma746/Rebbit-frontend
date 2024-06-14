// src/pages/EditPost.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, TextField, Button, Typography, Box, MenuItem } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const EditPost = () => {
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');
  const [state, setState] = useState('published'); // Valeur par défaut : 'published'
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await axios.get(`https://rebbit-api.marksu.fr/api/posts/${id}`);
        const post = res.data;
        setTitle(post.title);
        setContent(post.content);
        setTags(post.tags.join(', '));
        setState(post.state);
      } catch (err) {
        console.error('Error fetching post:', err.response ? err.response.data : 'Network error');
      }
    };

    fetchPost();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const formattedTags = tags.split(',').map(tag => tag.trim()); // Format tags as array
      console.log('Editing post with:', { title, content, tags: formattedTags, state }); // Log data being sent
      const res = await axios.put(`https://rebbit-api.marksu.fr/api/posts/${id}`, {
        title,
        content,
        tags: formattedTags,
        state
      }, {
        headers: {
          'x-auth-token': token
        }
      });
      console.log('Post edited successfully:', res.data);
      navigate(`/posts/${id}`);
    } catch (err) {
      console.error('Error editing post:', err.response ? err.response.data : 'Network error');
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          Éditer le post
        </Typography>
        <TextField
          label="Titre"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          variant="outlined"
          margin="normal"
          fullWidth
        />
        <ReactQuill
          value={content}
          onChange={setContent}
          style={{ height: '200px', marginBottom: '50px' }}
        />
        <TextField
          label="Tags (séparés par des virgules)"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          variant="outlined"
          margin="normal"
          fullWidth
        />
        <TextField
          select
          label="État"
          value={state}
          onChange={(e) => setState(e.target.value)}
          variant="outlined"
          margin="normal"
          fullWidth
        >
          <MenuItem value="draft">Brouillon</MenuItem>
          <MenuItem value="published">Publié</MenuItem>
          <MenuItem value="archived">Archivé</MenuItem>
        </TextField>
        <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
          Mettre à jour
        </Button>
      </Box>
    </Container>
  );
};

export default EditPost;
