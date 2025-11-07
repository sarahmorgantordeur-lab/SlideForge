import api from './api';

export const createSlide = async (deckId, title, content, order) => {
  const token = localStorage.getItem('token');
  const response = await api.post(
    `/decks/${deckId}/slides`,
    { title, content, order },
    {
      headers: { Authorization: `Bearer ${token}` }
    }
  );
  return response.data;
};
