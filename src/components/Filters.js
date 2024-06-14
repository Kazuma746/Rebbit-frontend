// src/components/Filters.js

import React, { useEffect } from 'react';
import { Box, Select, MenuItem } from '@mui/material';

const Filters = ({ posts, sortOrder, filterPeriod, handleSortChange, handleFilterChange, onFilter }) => {
  useEffect(() => {
    const filterPosts = (posts) => {
      const now = new Date();
      let filteredPosts = posts.filter(post => post.state === 'published');

      if (filterPeriod !== 'all') {
        filteredPosts = filteredPosts.filter(post => {
          const postDate = new Date(post.date_created);
          switch (filterPeriod) {
            case 'day':
              return (now - postDate) / (1000 * 60 * 60 * 24) <= 1;
            case 'week':
              return (now - postDate) / (1000 * 60 * 60 * 24 * 7) <= 1;
            case 'month':
              return (now - postDate) / (1000 * 60 * 60 * 24 * 30) <= 1;
            default:
              return true;
          }
        });
      }

      return filteredPosts;
    };

    const sortedPosts = filterPosts(posts).sort((a, b) => {
      if (sortOrder === 'upvotes') {
        return b.upvotes - a.upvotes;
      }
      return new Date(b.date_created) - new Date(a.date_created);
    });

    onFilter(sortedPosts);
  }, [posts, sortOrder, filterPeriod, onFilter]);

  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4 }}>
      <Select
        value={sortOrder}
        onChange={handleSortChange}
        displayEmpty
        inputProps={{ 'aria-label': 'Sort Posts' }}
        sx={{ mb: 2, minWidth: 120 }}
      >
        <MenuItem value="date">Trier par date</MenuItem>
        <MenuItem value="upvotes">Trier par upvotes</MenuItem>
      </Select>
      <Select
        value={filterPeriod}
        onChange={handleFilterChange}
        displayEmpty
        inputProps={{ 'aria-label': 'Filter Posts' }}
        sx={{ mb: 2, minWidth: 120 }}
      >
        <MenuItem value="all">Depuis toujours</MenuItem>
        <MenuItem value="day">Dernier jour</MenuItem>
        <MenuItem value="week">Dernière semaine</MenuItem>
        <MenuItem value="month">Dernier mois</MenuItem>
      </Select>
    </Box>
  );
};

export default Filters;
