import React from 'react';
import { Container, Typography, Box } from '@mui/material';

const Footer = () => {
  return (
    <Box sx={{ bgcolor: 'primary.main', color: 'white', py: 2, mt: 4 }}>
      <Container maxWidth="md" sx={{ textAlign: 'center' }}>
        <Typography variant="body1">
          &copy; {new Date().getFullYear()} REBBIT. Tous droits réservés.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
