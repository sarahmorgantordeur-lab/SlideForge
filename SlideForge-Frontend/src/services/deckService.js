import api from './api';

const deckService = {
  getAll: () => api.get('/decks'),

  getById: (id) => api.get(`/decks/${id}`),

  create: (data) => api.post('/decks', data),

  update: (id, data) => api.put(`/decks/${id}`, data),

  delete: (id) => api.delete(`/decks/${id}`)
};

export default deckService;
