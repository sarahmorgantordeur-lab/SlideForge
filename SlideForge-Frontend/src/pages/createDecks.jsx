import React, { useState } from 'react';
import { createDeck } from '../services/deckService';
import { useNavigate } from 'react-router-dom';

const CreateDeck = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    theme: '',
    ratio: ''
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const data = await createDeck(
        formData.title,
        formData.theme,
        formData.ratio
      );

      console.log('✅ Deck créé :', data);
      setSuccess('Deck créé avec succès !');
      setTimeout(() => navigate('/decks'), 2000);
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.message ||
        '❌ Une erreur est survenue lors de la création du deck.'
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Créer un Deck</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Titre */}
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">
              Titre du deck
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="mt-1 w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="Ex : Civilizations"
            />
          </div>

          {/* Thème */}
          <div>
            <label htmlFor="theme" className="block text-sm font-medium text-gray-700">
              Thème
            </label>
            <input
              type="text"
              id="theme"
              name="theme"
              value={formData.theme}
              onChange={handleChange}
              required
              className="mt-1 w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="Ex : Histoire, Science..."
            />
          </div>

          {/* Ratio */}
          <div>
            <label htmlFor="ratio" className="block text-sm font-medium text-gray-700">
              Ratio (facultatif)
            </label>
            <input
              type="text"
              id="ratio"
              name="ratio"
              value={formData.ratio}
              onChange={handleChange}
              className="mt-1 w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="Ex : 16:9"
            />
          </div>

          {/* Messages */}
          {error && (
            <p className="text-red-500 text-sm text-center mt-2">{error}</p>
          )}
          {success && (
            <p className="text-green-600 text-sm text-center mt-2">{success}</p>
          )}

          {/* Bouton */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition duration-200"
          >
            Créer le deck
          </button>
        </form>

        {/* Retour */}
        <p className="text-sm text-center text-gray-600 mt-4">
          <button
            onClick={() => navigate(-1)}
            className="text-blue-600 hover:underline"
          >
            ← Retour
          </button>
        </p>
      </div>
    </div>
  );
};

export default CreateDeck;
