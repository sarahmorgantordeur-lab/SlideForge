import api from './api';

export const slideService = {
  // Récupérer tous les slides d'un deck
  getByDeck: (deckId) => api.get(`/api/slides?deckId=${deckId}`),
  
  // Créer un slide
  create: (data) => api.post('/api/slides', data),
  
  // Mettre à jour un slide
  update: (id, data) => api.put(`/api/slides/${id}`, data),
  
  // Supprimer un slide
  delete: (id) => api.delete(`/api/slides/${id}`),
  
  // Réorganiser les slides
  reorder: (deckId, slideIds) => 
    api.put(`/api/slides/reorder`, { deckId, slideIds }),
};