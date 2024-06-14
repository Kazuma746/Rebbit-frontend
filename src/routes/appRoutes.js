// frontend/src/appRoutes.js

import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import PostDetail from '../pages/PostDetail';
import UserDetail from '../pages/admin/UserDetail';
import EditPost from '../pages/EditPost';
import CreatePost from '../pages/CreatePost';
import UserPosts from '../components/UserPosts';
import NotFound from '../pages/NotFound';
import Login from '../pages/Login';
import Register from '../pages/Register';
import PrivateRoute from '../components/PrivateRoute';
import AdminRoute from '../components/AdminRoute';
import Profile from '../pages/Profile';
import UserList from '../pages/admin/UserList';
import ForgotPassword from '../pages/ForgotPassword';
import ResetPassword from '../pages/ResetPassword';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
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
      <Route path="/user-posts/:userId" element={<UserPosts />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
