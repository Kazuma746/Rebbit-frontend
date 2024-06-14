// Login.js

import React, { useState, useContext } from 'react';
import axios from 'axios';
import { Container, Typography, TextField, Button, Box, Alert, Link } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('https://rebbit-api.marksu.fr/api/auth/login', { email, password });
      login(res.data.token, res.data.pseudo);
      navigate('/');
      window.location.reload();
    } catch (err) {
      console.error(err.response ? err.response.data : 'Network error');
      setError('Email ou mot de passe incorrect.');
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
          Se connecter
        </Typography>
        {error && (
          <Alert severity="error" sx={{ mb: 2, width: '100%' }}>
            {error}
          </Alert>
        )}
        <TextField
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          variant="outlined"
          margin="normal"
          fullWidth
        />
        <TextField
          label="Mot de passe"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          variant="outlined"
          margin="normal"
          fullWidth
        />
        <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
          Se connecter
        </Button>
        <Link href="/forgot-password" variant="body2" sx={{ mt: 2 }}>
          Mot de passe oublié ?
        </Link>
      </Box>
    </Container>
  );
};

export default Login;
