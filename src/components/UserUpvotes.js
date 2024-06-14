import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const UserUpvotes = ({ userId }) => {
  const [upvotes, setUpvotes] = useState([]);

  useEffect(() => {
    const fetchUpvotes = async () => {
      try {
        const upvotesRes = await axios.get(`https://rebbit-api.marksu.fr/api/users/${userId}/upvotes`, {
          headers: { 'x-auth-token': localStorage.getItem('token') }
        });
        console.log('Upvotes data:', upvotesRes.data);
        setUpvotes(upvotesRes.data);
      } catch (err) {
        console.error('Error fetching upvotes:', err);
      }
    };
    fetchUpvotes();
  }, [userId]);

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h5" component="h2" gutterBottom>
        Mes upvotes
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Type</TableCell>
            <TableCell>Contenu</TableCell>
            <TableCell>Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {upvotes.length > 0 ? (
            upvotes.map((upvote, index) => (
              <TableRow key={index}>
                <TableCell>{upvote.type}</TableCell>
                <TableCell>
                  <RouterLink to={`/posts/${upvote.postId}`}>
                    {upvote.content}
                  </RouterLink>
                </TableCell>
                <TableCell>{new Date(upvote.date).toLocaleDateString()}</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={3}>Aucun upvote trouvé.</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </Container>
  );
};

export default UserUpvotes;
