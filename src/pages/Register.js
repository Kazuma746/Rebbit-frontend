// src/pages/Register.js

import React, { useState } from 'react';
import axios from 'axios';
import { Container, TextField, Button, Typography, Box } from '@mui/material';

const Register = () => {
  const [pseudo, setPseudo] = useState('');
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [birthdate, setBirthdate] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/register', {
        pseudo,
        nom,
        prenom,
        email,
        password,
        birthdate,
      });
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('pseudo', pseudo); // Stocker le pseudo
      window.location.href = '/'; // Redirection après l'inscription
    } catch (err) {
      if (err.response) {
        console.error('Erreur réponse:', err.response.data);
      } else if (err.request) {
        console.error('Erreur requête:', err.request);
      } else {
        console.error('Erreur:', err.message);
      }
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
          Inscription
        </Typography>
        <TextField
          label="Pseudo"
          value={pseudo}
          onChange={(e) => setPseudo(e.target.value)}
          variant="outlined"
          margin="normal"
          fullWidth
        />
        <TextField
          label="Nom"
          value={nom}
          onChange={(e) => setNom(e.target.value)}
          variant="outlined"
          margin="normal"
          fullWidth
        />
        <TextField
          label="Prénom"
          value={prenom}
          onChange={(e) => setPrenom(e.target.value)}
          variant="outlined"
          margin="normal"
          fullWidth
        />
        <TextField
          label="Email"
          type="email"
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
        <TextField
          label="Date de naissance"
          type="date"
          value={birthdate}
          onChange={(e) => setBirthdate(e.target.value)}
          variant="outlined"
          margin="normal"
          fullWidth
          InputLabelProps={{
            shrink: true,
          }}
        />
        <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
          S'inscrire
        </Button>
      </Box>
    </Container>
  );
};

export default Register;
