// src/pages/Profile.js

import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Typography, Box, Button, TextField, Alert, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import UserPosts from '../components/UserPosts';
import UserComments from '../components/UserComments';
import UserUpvotes from '../components/UserUpvotes';

const Profile = () => {
  const { user, login, logout } = useContext(AuthContext);
  const [newPseudo, setNewPseudo] = useState('');
  const [email, setEmail] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openPseudoDialog, setOpenPseudoDialog] = useState(false);
  const [openEmailDialog, setOpenEmailDialog] = useState(false);
  const [openPasswordDialog, setOpenPasswordDialog] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userRes = await axios.get('https://rebbit-api.marksu.fr/api/auth/user', {
          headers: { 'x-auth-token': localStorage.getItem('token') }
        });
        setEmail(userRes.data.email);
      } catch (err) {
        console.error('Error fetching data:', err);
      }
    };
    fetchData();
  }, []);

  const handlePseudoChange = async () => {
    if (!newPseudo) {
      setErrorMessage('Le pseudo est requis');
      return;
    }

    try {
      const res = await axios.put('https://rebbit-api.marksu.fr/api/users/pseudo', { pseudo: newPseudo }, {
        headers: {
          'x-auth-token': localStorage.getItem('token')
        }
      });
      setSuccessMessage(res.data.msg);
      setErrorMessage('');
      login(localStorage.getItem('token'), { ...user, pseudo: newPseudo });
    } catch (err) {
      setErrorMessage(err.response ? err.response.data.msg : 'Erreur lors du changement de pseudo');
      setSuccessMessage('');
      console.error('Error changing pseudo:', err);
    }
    setOpenPseudoDialog(false);
  };

  const handleEmailChange = async () => {
    if (!newEmail) {
      setErrorMessage('L\'adresse e-mail est requise');
      return;
    }

    try {
      const res = await axios.put('https://rebbit-api.marksu.fr/api/auth/change-email', { newEmail }, {
        headers: {
          'x-auth-token': localStorage.getItem('token')
        }
      });
      setSuccessMessage(res.data.msg);
      setErrorMessage('');
      setEmail(newEmail);
    } catch (err) {
      setErrorMessage(err.response ? err.response.data.msg : 'Erreur lors du changement d\'adresse e-mail');
      setSuccessMessage('');
      console.error('Error changing email:', err);
    }
    setOpenEmailDialog(false);
  };

  const handlePasswordChange = async () => {
    if (!currentPassword || !newPassword) {
      setErrorMessage('Tous les champs sont requis');
      return;
    }

    try {
      const res = await axios.put('https://rebbit-api.marksu.fr/api/auth/change-password', { currentPassword, newPassword }, {
        headers: {
          'x-auth-token': localStorage.getItem('token')
        }
      });
      setSuccessMessage(res.data.msg);
      setErrorMessage('');
    } catch (err) {
      setErrorMessage(err.response ? err.response.data.msg : 'Erreur lors du changement de mot de passe');
      setSuccessMessage('');
      console.error('Error changing password:', err);
    }
    setOpenPasswordDialog(false);
  };

  const handleDeleteAccount = async () => {
    try {
      await axios.delete('https://rebbit-api.marksu.fr/api/auth/delete-account', {
        headers: {
          'x-auth-token': localStorage.getItem('token')
        }
      });
      logout();
      navigate('/');
      window.location.reload();
    } catch (err) {
      console.error('Error deleting account:', err);
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Profil de {user ? user.pseudo : ''}
      </Typography>
      {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
      {successMessage && <Alert severity="success">{successMessage}</Alert>}
      <Box sx={{ my: 2 }}>
        <TextField
          label="Nouveau pseudo"
          value={newPseudo}
          onChange={(e) => setNewPseudo(e.target.value)}
          variant="outlined"
          margin="normal"
          fullWidth
        />
        <Button variant="contained" color="primary" onClick={() => setOpenPseudoDialog(true)}>
          Changer de pseudo
        </Button>
      </Box>
      <Box sx={{ my: 2 }}>
        <TextField
          label="Adresse e-mail actuelle"
          value={email}
          variant="outlined"
          margin="normal"
          fullWidth
          disabled
        />
        <TextField
          label="Nouvelle adresse e-mail"
          value={newEmail}
          onChange={(e) => setNewEmail(e.target.value)}
          variant="outlined"
          margin="normal"
          fullWidth
        />
        <Button variant="contained" color="primary" onClick={() => setOpenEmailDialog(true)}>
          Changer d'adresse e-mail
        </Button>
      </Box>
      <Box sx={{ my: 2 }}>
        <TextField
          label="Mot de passe actuel"
          type="password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          variant="outlined"
          margin="normal"
          fullWidth
        />
        <TextField
          label="Nouveau mot de passe"
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          variant="outlined"
          margin="normal"
          fullWidth
        />
        <Button variant="contained" color="primary" onClick={() => setOpenPasswordDialog(true)}>
          Changer de mot de passe
        </Button>
      </Box>
      <Box sx={{ my: 2 }}>
        <Button variant="contained" color="secondary" onClick={() => setOpenDeleteDialog(true)}>
          Supprimer le compte
        </Button>
      </Box>
      <UserPosts userId={user ? user._id : ''} />
      <UserComments userId={user ? user._id : ''} />
      <UserUpvotes userId={user ? user._id : ''} />

      <Dialog open={openPseudoDialog} onClose={() => setOpenPseudoDialog(false)}>
        <DialogTitle>Confirmer le changement de pseudo</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Êtes-vous sûr de vouloir changer votre pseudo ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenPseudoDialog(false)} color="primary">
            Annuler
          </Button>
          <Button onClick={handlePseudoChange} color="secondary">
            Confirmer
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openEmailDialog} onClose={() => setOpenEmailDialog(false)}>
        <DialogTitle>Confirmer le changement d'adresse e-mail</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Êtes-vous sûr de vouloir changer votre adresse e-mail ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEmailDialog(false)} color="primary">
            Annuler
          </Button>
          <Button onClick={handleEmailChange} color="secondary">
            Confirmer
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openPasswordDialog} onClose={() => setOpenPasswordDialog(false)}>
        <DialogTitle>Confirmer le changement de mot de passe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Êtes-vous sûr de vouloir changer votre mot de passe ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenPasswordDialog(false)} color="primary">
            Annuler
          </Button>
          <Button onClick={handlePasswordChange} color="secondary">
            Confirmer
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openDeleteDialog} onClose={() => setOpenDeleteDialog(false)}>
        <DialogTitle>Confirmer la suppression</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Êtes-vous sûr de vouloir supprimer votre compte ? Cette action est irréversible.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDeleteDialog(false)} color="primary">
            Annuler
          </Button>
          <Button onClick={handleDeleteAccount} color="secondary">
            Confirmer
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Profile;
