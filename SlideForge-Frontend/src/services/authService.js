import axios from 'axios';
import api from './api';


// Inscription
export const register = async (name, email, password) => {
  const response = await api.post(`/auth/register`, {
    name,
    email,
    password
  });
  return response.data;
};

// Connexion
export const login = async (email, password) => {
  const response = await api.post(`/auth/login`, {
    email,
    password
  });
  localStorage.setItem('token', response.data.token);
  return response.data;
};

// Créer un deck (authentifié)
export const createDeck = async (title, theme, ratio) => {
  const token = localStorage.getItem('token');
  const response = await api.post(
    `/decks`,
    { title, theme, ratio },
    {
      headers: { Authorization: `Bearer ${token}` }
    }
  );
  return response.data;
};


// export const logout() {
//     localStorage.removeItem('token');
// };


// export const isAuthenticated: () => {
//     return !!localStorage.getItem('token');
//   };