// frontend/src/App.js

import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import Header from './components/Header';
import Footer from './components/Footer';
import { AuthProvider } from './context/AuthContext';
import AppRoutes from './routes/appRoutes'; 

const theme = createTheme({
  palette: {
    primary: {
      main: '#3f51b5',
    },
    secondary: {
      main: '#f50057',
    },
  },
});

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <Router>
          <Header />
          <div style={{ minHeight: 'calc(100vh - 128px)' }}>
            <AppRoutes />
          </div>
          <Footer />
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
