// frontend/src/pages/admin/UserList.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Typography, Table, TableBody, TableCell, TableHead, TableRow, IconButton, Tooltip } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ConfirmDialog from '../../components/ConfirmDialog';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/admin/users', {
          headers: { 'x-auth-token': localStorage.getItem('token') }
        });
        setUsers(res.data);
      } catch (err) {
        console.error('Erreur lors de la récupération des utilisateurs', err);
      }
    };
    fetchUsers();
  }, []);

  const handleDeleteUser = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/admin/users/${selectedUserId}`, {
        headers: { 'x-auth-token': localStorage.getItem('token') }
      });
      setUsers(users.filter(user => user._id !== selectedUserId));
      setConfirmOpen(false);
      setSelectedUserId(null);
    } catch (err) {
      console.error('Erreur lors de la suppression de l\'utilisateur', err);
    }
  };

  const openConfirmDialog = (userId) => {
    setSelectedUserId(userId);
    setConfirmOpen(true);
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Liste des utilisateurs
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Pseudo</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user._id}>
              <TableCell>{user.pseudo}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>
                <Tooltip title="Éditer">
                  <IconButton component={RouterLink} to={`/admin/users/${user._id}`}>
                    <EditIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Supprimer">
                  <IconButton onClick={() => openConfirmDialog(user._id)}>
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <ConfirmDialog
        open={confirmOpen}
        handleClose={() => setConfirmOpen(false)}
        handleConfirm={handleDeleteUser}
        title="Confirmer la suppression"
      >
        Êtes-vous sûr de vouloir supprimer cet utilisateur ?
      </ConfirmDialog>
    </Container>
  );
};

export default UserList;
