import api from './api';

// Service principal pour les decks
const deckService = {
  getAll: () => api.get('/decks'),

  getById: (id) => api.get(`/decks/${id}`),

  create: (data) => api.post('/decks', data),

  update: (id, data) => api.put(`/decks/${id}`, data),

  delete: (id) => api.delete(`/decks/${id}`)
};

// Fonction spécifique pour créer un deck avec authentification
export const createDeck = async (title, theme, ratio) => {
  const token = localStorage.getItem('token');
  const response = await api.post(
    '/decks',
    { title, theme, ratio },
    {
      headers: { Authorization: `Bearer ${token}` }
    }
  );
  return response.data;
};

// Fonction spécifique pour récupérer tous les decks authentifiés
export const getDecks = async () => {
  const token = localStorage.getItem('token');
  const response = await api.get('/decks', {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data.decks;
};

export default deckService;
