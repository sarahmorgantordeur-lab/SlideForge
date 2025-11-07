import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import deckService from "../services/deckService";

const CreateDeck = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [theme, setTheme] = useState("default");
  const [ratio, setRatio] = useState("16:9");
  const [error, setError] = useState("");

  const themesDisponibles = ["default", "dark", "light", "blue", "green", "red", "purple"];
  const ratiosDisponibles = ["16:9", "4:3", "16:10"];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const data = await deckService.create({ title, theme, ratio });
      console.log("✅ Deck créé :", data);

      // Redirection vers createSlides avec le deckId
      navigate(`/create-slides?deckId=${data.id}`);
    } catch (err) {
      console.error("❌ Erreur lors de la création :", err);
      setError(
        err.response?.data?.message || "Erreur inconnue lors de la création du deck."
      );
    }
  };

  return (
    <div className="page-container">
      <h1>Créer un Deck</h1>
      <form onSubmit={handleSubmit} className="form-container">
        <label>
          Titre du deck :
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </label>

        <label>
          Thème :
          <select value={theme} onChange={(e) => setTheme(e.target.value)} required>
            {themesDisponibles.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </label>

        <label>
          Ratio :
          <select value={ratio} onChange={(e) => setRatio(e.target.value)}>
            {ratiosDisponibles.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
        </label>

        {/* Supprime l'onClick : le submit appelle handleSubmit qui gère la navigation */}
        <button type="submit">Créer le deck</button>

        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
    </div>
  );
};

export default CreateDeck;
