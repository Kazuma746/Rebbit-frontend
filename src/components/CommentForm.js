// src/components/CommentForm.js

import React from 'react';
import { Box, TextField, Button } from '@mui/material';

const CommentForm = ({ label, value, onChange, onSubmit }) => {
  return (
    <Box sx={{ mb: 2 }}>
      <TextField
        label={label}
        value={value}
        onChange={onChange}
        variant="outlined"
        margin="normal"
        fullWidth
      />
      <Button variant="contained" color="primary" onClick={onSubmit}>
        Envoyer
      </Button>
    </Box>
  );
};

export default CommentForm;
