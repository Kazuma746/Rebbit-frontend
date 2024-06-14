// src/pages/Home.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Typography, Box, Card, CardContent, CardActions, IconButton, Tooltip } from '@mui/material';
import parse from 'html-react-parser';
import Tag from '../components/Tag';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import CommentIcon from '@mui/icons-material/Comment';
import LinkButton from '../components/LinkButton';
import Filters from '../components/Filters';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [sortedPosts, setSortedPosts] = useState([]);
  const [sortOrder, setSortOrder] = useState('date');
  const [filterPeriod, setFilterPeriod] = useState('all');
  const token = localStorage.getItem('token');
  const pseudo = localStorage.getItem('pseudo');
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get('https://rebbit-api.marksu.fr/api/posts');
        setPosts(res.data);
      } catch (err) {
        console.error('Erreur lors de la récupération des posts', err);
      }
    };
    fetchPosts();
  }, []);

  const truncateContent = (content, maxLength = 200) => {
    return content.length > maxLength ? content.substring(0, maxLength) + '...' : content;
  };

  const handleUpvote = async (postId) => {
    try {
      const res = await axios.put(`https://rebbit-api.marksu.fr/api/posts/upvote/${postId}`, {}, {
        headers: {
          'x-auth-token': token,
        }
      });
      setPosts(posts.map(post => post._id === postId ? { ...post, upvotes: res.data.upvotes, upvotedBy: res.data.upvotedBy } : post));
    } catch (err) {
      console.error('Error upvoting post:', err.response ? err.response.data : 'Network error');
    }
  };

  const handleSortChange = (event) => {
    setSortOrder(event.target.value);
  };

  const handleFilterChange = (event) => {
    setFilterPeriod(event.target.value);
  };

  const handleFilter = (filteredPosts) => {
    setSortedPosts(filteredPosts);
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Bienvenue sur REBBIT
        </Typography>
        {token && pseudo ? (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
            }}
          >
            <LinkButton to="/create-post" sx={{ mb: 2 }}>
              Créer un post
            </LinkButton>
          </Box>
        ) : (
          <Box>
            <LinkButton to="/login" sx={{ m: 1 }}>
              Se connecter
            </LinkButton>
            <LinkButton to="/register" variant="outlined" sx={{ m: 1 }}>
              S'inscrire
            </LinkButton>
          </Box>
        )}
      </Box>
      <Filters 
        posts={posts}
        sortOrder={sortOrder} 
        filterPeriod={filterPeriod} 
        handleSortChange={handleSortChange} 
        handleFilterChange={handleFilterChange} 
        onFilter={handleFilter}
      />
      <Box>
        {sortedPosts.map((post) => (
          <Card key={post._id} sx={{ mb: 2, width: '100%' }}>
            <CardContent>
              <Typography variant="h5" component="h2">
                {post.title}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                Posté par : {post.user ? post.user.pseudo : 'Utilisateur inconnu'}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                le {new Date(post.date_created).toLocaleDateString()} à {new Date(post.date_created).toLocaleTimeString()}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                {parse(truncateContent(post.content))}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                {token && (
                  <Tooltip title="Upvote">
                    <IconButton color="default" onClick={() => handleUpvote(post._id)}>
                      <ArrowUpwardIcon style={{ filter: post.upvotedBy && post.upvotedBy.includes(userId) ? 'invert(50%) sepia(100%) saturate(1000%) hue-rotate(190deg)' : 'none' }} />
                    </IconButton>
                  </Tooltip>
                )}
                <Typography variant="caption" color="textSecondary" sx={{ ml: 1, mr: 2 }}>
                  Upvotes: {post.upvotes}
                </Typography>
                <CommentIcon />
                <Typography variant="caption" color="textSecondary" sx={{ ml: 1 }}>
                  {post.comments.length}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
                <Typography variant="caption" color="textSecondary" sx={{ mr: 1 }}>
                  Tags :
                </Typography>
                {post.tags.map((tag) => (
                  <Tag key={tag} label={tag} />
                ))}
              </Box>
            </CardContent>
            <CardActions>
              <LinkButton to={`/posts/${post._id}`} size="small">
                Lire la suite
              </LinkButton>
            </CardActions>
          </Card>
        ))}
      </Box>
    </Container>
  );
};

export default Home;
