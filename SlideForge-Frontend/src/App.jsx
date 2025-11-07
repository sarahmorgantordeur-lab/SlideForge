import axios from 'axios';
import { useEffect, useState } from 'react';
import { register, login } from './services/authService';
import { deckService } from './services/deckService';
import './index.css';

export default function App() {
  const [isLogged, setIsLogged] = useState(false);
  const [isRegister, setIsRegister] = useState(false);

  const handleLogin = async () => {
    try {
      //Identifiants de test
      await login({email:'john@example.com', password:'password123'});
      console.log('✅ Connexion réussie');
      setIsLogged(true);
      
      // Maintenant on peut récupérer les decks
      const decks = await deckService.getAll();
      console.log('✅ Decks:', decks.data);
    } catch (error) {
      console.error('❌ Erreur:', error.response?.data || error.message);
    }
  };

    const handleRegister = async () => {
    try {
      //Identifiants de test
      await register({name : 'John Doe', email : 'john@example.com', password :'password123'});
      console.log('✅ Inscription réussie');
      setIsRegister(true);
      
      // Maintenant on peut récupérer les decks
      const decks = await deckService.getAll();
      console.log('✅ Decks:', decks.data);
    } catch (error) {
      console.error('❌ Erreur:', error.response?.data || error.message);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>SlideForge</h1>
      
      {!isLogged ? (
        <div>
          <p>Vous devez vous connecter</p>
          <button onClick={handleLogin}>
            Se connecter
          </button>
        </div>
      ) : (
        <p>✅ Connecté ! Ouvrez la console</p>
      )}

      {!isRegister? (
        <div>
          <p>Vous devez vous inscrire</p>
          <button 
          onClick={handleRegister}
          >
            S'inscrire
          </button>
        </div>
      ) : (
        <p>✅ Inscrit ! Ouvrez la console</p>
      )}
    </div>
  );
}