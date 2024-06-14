//src/pages/CreatePost.js

import React, { useState } from 'react';
import axios from 'axios';
import { Container, TextField, Button, Typography, Box, MenuItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tag, setTag] = useState(''); // Un seul tag
  const [state, setState] = useState('published'); // Valeur par défaut : 'published'
  const [images, setImages] = useState([]);
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    setImages([...e.target.files]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
  
      // Upload images
      const formData = new FormData();
      images.forEach(image => {
        formData.append('images', image);
      });
      const uploadRes = await axios.post('http://localhost:5000/api/upload', formData, {
        headers: {
          'x-auth-token': token,
          'Content-Type': 'multipart/form-data'
        }
      });
      const imageUrls = uploadRes.data.fileNames;
  
      // Create post
      await axios.post('http://localhost:5000/api/posts', {
        title,
        content,
        tags: [tag], // Utiliser un tableau avec un seul tag
        state,
        images: imageUrls // Add image URLs to the post
      }, {
        headers: {
          'x-auth-token': token
        }
      });
      navigate('/');
    } catch (err) {
      console.error('Error creating post:', err.response ? err.response.data : 'Network error');
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
          gap: 2,
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          Créer un post
        </Typography>
        <TextField
          label="Titre"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          variant="outlined"
          margin="normal"
          fullWidth
        />
        <Box sx={{ width: '100%', mb: 2 }}>
          <ReactQuill
            value={content}
            onChange={setContent}
            style={{ height: '200px' }}
          />
        </Box>
        <TextField
          label="Tag"
          value={tag}
          onChange={(e) => setTag(e.target.value)}
          variant="outlined"
          margin="normal"
          fullWidth
          sx={{ mb: 2 }}
        />
        <TextField
          select
          label="État"
          value={state}
          onChange={(e) => setState(e.target.value)}
          variant="outlined"
          margin="normal"
          fullWidth
          sx={{ mb: 2 }}
        >
          <MenuItem value="draft">Brouillon</MenuItem>
          <MenuItem value="published">Publié</MenuItem>
          <MenuItem value="archived">Archivé</MenuItem>
        </TextField>
        <Box sx={{ mb: 2 }}>
          <input
            type="file"
            multiple
            onChange={handleImageChange}
            style={{ margin: '20px 0' }}
          />
        </Box>
        <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
          Publier
        </Button>
      </Box>
    </Container>
  );
};

export default CreatePost;
