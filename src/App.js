// frontend/src/App.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import CreatePost from './pages/CreatePost';
import PostDetail from './pages/PostDetail';
import EditPost from './pages/EditPost';
import PrivateRoute from './components/PrivateRoute';
import AdminRoute from './components/AdminRoute'; 
import UserList from './pages/admin/UserList'; 
import UserDetail from './pages/admin/UserDetail';
import Header from './components/Header';
import Footer from './components/Footer';
import { AuthProvider } from './context/AuthContext';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';

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
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/reset-password" element={<ResetPassword />} />
              <Route path="/profile" element={
                <PrivateRoute>
                  <Profile />
                </PrivateRoute>
              } />
              <Route path="/create-post" element={
                <PrivateRoute>
                  <CreatePost />
                </PrivateRoute>
              } />
              <Route path="/posts/:id" element={<PostDetail />} />
              <Route path="/edit-post/:id" element={
                <PrivateRoute>
                  <EditPost />
                </PrivateRoute>
              } />
              <Route path="/admin" element={
                <AdminRoute>
                  <UserList />
                </AdminRoute>
              } />
              <Route path="/admin/users/:id" element={
                <AdminRoute>
                  <UserDetail />
                </AdminRoute>
              } />
            </Routes>
          </div>
          <Footer />
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
