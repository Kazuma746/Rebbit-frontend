// src/pages/PostDetail.js

import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link as RouterLink } from 'react-router-dom';
import axios from 'axios';
import { Container, Paper, Typography, Button } from '@mui/material';
import PostContent from '../components/PostContent';
import Comments from '../components/Comments';

const PostDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [user, setUser] = useState(null);
  const [postNotFound, setPostNotFound] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await axios.get(`https://rebbit-api.marksu.fr/api/posts/${id}`);
        setPost(res.data);
      } catch (err) {
        if (err.response && err.response.status === 404) {
          setPostNotFound(true);
        } else {
          console.error('Error fetching post:', err.response ? err.response.data : 'Network error');
        }
      }
    };

    const fetchUser = async () => {
      if (!token) {
        console.error('No token found');
        return;
      }

      try {
        const res = await axios.get('https://rebbit-api.marksu.fr/api/auth/user', {
          headers: {
            'x-auth-token': token,
          },
        });
        setUser(res.data);
      } catch (err) {
        console.error('Error fetching user:', err.response ? err.response.data : 'Network error');
      }
    };

    fetchPost();
    fetchUser();
  }, [id, token]);

  const handleDelete = async () => {
    const confirmDelete = window.confirm("Êtes-vous sûr de vouloir supprimer ce post ?");
    if (confirmDelete) {
      try {
        await axios.delete(`https://rebbit-api.marksu.fr/api/posts/${id}`, {
          headers: {
            'x-auth-token': token,
          },
        });
        navigate('/');
      } catch (err) {
        console.error('Error deleting post:', err.response ? err.response.data : 'Network error');
        alert('Erreur du serveur lors de la suppression du post.');
      }
    }
  };

  const handleEdit = () => {
    navigate(`/edit-post/${id}`);
  };

  const handleCommentDelete = async (commentId) => {
    try {
      await axios.delete(`https://rebbit-api.marksu.fr/api/comments/${commentId}`, {
        headers: {
          'x-auth-token': token,
        },
      });
      setPost((prevPost) => ({
        ...prevPost,
        comments: prevPost.comments.filter((comment) => comment._id !== commentId),
      }));
    } catch (err) {
      console.error('Error deleting comment:', err.response ? err.response.data : 'Network error');
    }
  };

  if (postNotFound) {
    return (
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Paper elevation={3} sx={{ p: 4, textAlign: 'center' }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Ce post a été supprimé
          </Typography>
          <Typography variant="body1" color="textSecondary">
            Le post que vous cherchez n'existe plus ou a été supprimé.
          </Typography>
          <Button variant="contained" color="primary" component={RouterLink} to="/" sx={{ mt: 2 }}>
            Retour à l'accueil
          </Button>
        </Paper>
      </Container>
    );
  }

  if (!post) return <div>Loading...</div>;

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <PostContent post={post} user={user} handleDelete={handleDelete} handleEdit={handleEdit} />
      </Paper>
      <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
        <Comments postId={id} token={token} user={user} onDeleteComment={handleCommentDelete} />
      </Paper>
    </Container>
  );
};

export default PostDetail;
