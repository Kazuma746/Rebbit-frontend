// src/components/Tag.js

import React from 'react';
import { Chip } from '@mui/material';

const Tag = ({ label }) => {
  return <Chip label={label} sx={{ mr: 1, mb: 1, backgroundColor: '#e0e0e0' }} />;
};

export default Tag;
