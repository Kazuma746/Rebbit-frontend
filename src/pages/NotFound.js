// frontend/src/pages/NotFound.js

import React from 'react';
import { Typography, Button, Container, Grid } from '@mui/material';
import { Link } from 'react-router-dom';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

const NotFound = () => {
  return (
    <Container maxWidth="md" sx={{ textAlign: 'center', mt: 8 }}>
      <Grid container spacing={2} alignItems="center" justifyContent="center">
        <Grid item xs={12}>
          <ErrorOutlineIcon color="error" style={{ fontSize: 80 }} />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h3" component="h1" gutterBottom>
            404 - Page Introuvable
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body1" sx={{ mb: 4 }}>
            La page que vous recherchez a peut-être été supprimée, son nom a changé ou est temporairement indisponible.
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" color="primary" component={Link} to="/">
            Retour à l'accueil
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default NotFound;
