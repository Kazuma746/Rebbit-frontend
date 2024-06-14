// src/pages/ResetPassword.js

import React, { useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { Container, TextField, Button, Typography, Box } from '@mui/material';

const ResetPassword = () => {
  const query = new URLSearchParams(useLocation().search);
  const token = query.get('token');

  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/reset-password', {
        token,
        newPassword
      });
      setMessage(res.data.msg);
    } catch (err) {
      console.error('Erreur:', err.message);
      setMessage('Erreur lors de la réinitialisation du mot de passe');
    }
  };

  return (
    <Container maxWidth="sm">
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          mt: 8
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          Réinitialiser le mot de passe
        </Typography>
        <TextField
          label="Nouveau mot de passe"
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          variant="outlined"
          margin="normal"
          fullWidth
        />
        <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
          Réinitialiser
        </Button>
        {message && <Typography variant="body1" sx={{ mt: 2 }}>{message}</Typography>}
      </Box>
    </Container>
  );
};

export default ResetPassword;
