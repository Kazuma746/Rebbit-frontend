import React, { useContext } from 'react';
import { AppBar, Toolbar, Typography, Button, Box, CircularProgress } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import rebbitLogo from '../assets/svg/rebbit.svg';

const Header = () => {
  const { isAuthenticated, user, logout, loading } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
    window.location.reload();
  };

  if (loading) {
    return (
      <AppBar position="static">
        <Toolbar>
          <CircularProgress color="inherit" />
        </Toolbar>
      </AppBar>
    );
  }

  return (
    <AppBar position="static">
      <Toolbar>
        <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
          <img src={rebbitLogo} alt="Rebbit" style={{ height: '40px', marginRight: '10px' }} />
          <Typography variant="h6" component={RouterLink} to="/" sx={{ textDecoration: 'none', color: 'inherit' }}>
            REBBIT
          </Typography>
        </Box>
        {isAuthenticated ? (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Button
              component={RouterLink}
              to="/profile"
              color="inherit"
              sx={{ textDecoration: 'none', color: 'inherit', mr: 2 }}
            >
              {user.pseudo}
            </Button>
            {user && user.role === 'admin' && (
              <Button
                component={RouterLink}
                to="/admin"
                color="inherit"
                sx={{ textDecoration: 'none', color: 'inherit', mr: 2 }}
              >
                Administration
              </Button>
            )}
            <Button color="inherit" onClick={handleLogout}>Se déconnecter</Button>
          </Box>
        ) : (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Button color="inherit" component={RouterLink} to="/login" sx={{ mr: 2 }}>Se connecter</Button>
            <Button color="inherit" component={RouterLink} to="/register">S'inscrire</Button>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
