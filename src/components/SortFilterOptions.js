// src/components/SortFilterOptions.js

import React from 'react';
import { Box, Select, MenuItem } from '@mui/material';

const SortFilterOptions = ({ sortOrder, handleSortChange, filterPeriod, handleFilterChange }) => {
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

export default SortFilterOptions;
