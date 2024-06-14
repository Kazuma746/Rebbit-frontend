// src/pages/ForgotPassword.js

import React, { useState } from 'react';
import axios from 'axios';
import { Container, TextField, Button, Typography, Box } from '@mui/material';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('https://rebbit-api.marksu.fr/api/auth/forgot-password', { email });
      setMessage(res.data.msg);
    } catch (err) {
      console.error('Erreur:', err.message);
      setMessage('Erreur lors de l\'envoi de l\'email de réinitialisation');
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
          Mot de passe oublié
        </Typography>
        <TextField
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          variant="outlined"
          margin="normal"
          fullWidth
        />
        <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
          Envoyer
        </Button>
        {message && <Typography variant="body1" sx={{ mt: 2 }}>{message}</Typography>}
      </Box>
    </Container>
  );
};

export default ForgotPassword;
