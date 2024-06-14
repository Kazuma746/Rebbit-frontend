// frontend/src/utils/commentUtils.js

import axios from 'axios';

export const deleteComment = async (commentId, token) => {
  try {
    const res = await axios.delete(`http://localhost:5000/api/comments/${commentId}`, {
      headers: {
        'x-auth-token': token,
      },
    });
    return res.data;
  } catch (err) {
    console.error('Error deleting comment:', err.response ? err.response.data : 'Network error');
    throw new Error('Erreur du serveur lors de la suppression du commentaire.');
  }
};
