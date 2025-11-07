import { useState } from 'react';
import { register, login } from './services/authService';
import deckService from './services/deckService';
import CreateSlides from './pages/createSlides';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import CreateDeck from './pages/createDecks';
import './index.css';

// Composant principal de la page d'accueil
function Home() {
  const navigate = useNavigate();
  const [isLogged, setIsLogged] = useState(false);
  const [isRegister, setIsRegister] = useState(false);

  const handleLogin = async () => {
    try {
      await login('john@example.com', 'password123');
      console.log('✅ Connexion réussie');
      setIsLogged(true);

      // Récupération des decks
      const decks = await deckService.getAll();
      console.log('✅ Decks:', decks.data);

      // Redirection vers la page de création de deck
      navigate('/create-deck');
    } catch (error) {
      console.error('❌ Erreur de connexion :', error.response?.data || error.message);
    }
  };

  const handleRegister = async () => {
    try {
      await register('John Doe', 'john@example.com', 'password123');
      console.log('✅ Inscription réussie');
      setIsRegister(true);

      // Redirection vers la page de création de deck
      navigate('/create-deck');
    } catch (error) {
      console.error('❌ Erreur d’inscription :', error.response?.data || error.message);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>SlideForge</h1>

      {/* Connexion */}
      <div>
        <p>Vous devez vous connecter</p>
        <button onClick={handleLogin}>Se connecter</button>
      </div>

      {/* Inscription */}
      <div style={{ marginTop: '20px' }}>
        <p>Vous devez vous inscrire</p>
        <button onClick={handleRegister}>S'inscrire</button>
      </div>
    </div>
  );
}

// Configuration des routes
export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create-deck" element={<CreateDeck />} />
        <Route path="/create-slide" element={<CreateSlides />} />
      </Routes>
    </Router>
  );
}
