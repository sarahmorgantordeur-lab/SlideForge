import api from './api';

export const authService = {

  register: async (userData) => {
    const response = await api.post('/api/auth/register', userData);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
    }
    return response;
  },


  login: async (email, password) => {
    const response = await api.post('/api/auth/login', { email, password });
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
    }
    return response;
  },


  logout: () => {
    localStorage.removeItem('token');
  },


  isAuthenticated: () => {
    return !!localStorage.getItem('token');
  },
};