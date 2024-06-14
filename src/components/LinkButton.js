// components/LinkButton.js

import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Button } from '@mui/material';

const LinkButton = ({ to, children, variant = "contained", color = "primary", ...props }) => {
  return (
    <Button component={RouterLink} to={to} variant={variant} color={color} {...props}>
      {children}
    </Button>
  );
};

export default LinkButton;
