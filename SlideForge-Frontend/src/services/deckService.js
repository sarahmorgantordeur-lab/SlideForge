import api from './api';

export const deckService = {

  getAll: () => api.get('/api/decks'),
  

  getById: (id) => api.get(`/api/decks/${id}`),
  

  create: (data) => api.post('/api/decks', data),
  

  update: (id, data) => api.put(`/api/decks/${id}`, data),
  

  delete: (id) => api.delete(`/api/decks/${id}`),
};