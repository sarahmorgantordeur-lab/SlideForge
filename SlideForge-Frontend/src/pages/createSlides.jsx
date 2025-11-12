import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { createSlideInDeck } from "../services/deckService";


const CreateSlides = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const deckId = searchParams.get("deckId"); // Récupération automatique de l'ID du deck

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    kind: "text",
    bg: "#ffffff",
    order: 0,
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      if (!deckId) {
        throw new Error("Aucun ID de deck trouvé dans l’URL !");
      }

      const slideData = {
        ...formData,
        order: parseInt(formData.order, 10),
      };

      const data = await createSlideInDeck(deckId, slideData);
      console.log("✅ Slide créée :", data);

      setSuccess("La diapositive a été créée avec succès !");
      setTimeout(() => navigate(`/decks/${deckId}/slides`), 2000);
    } catch (err) {
      console.error("❌ Erreur :", err);
      setError(
        err.response?.data?.message ||
          err.message ||
          "Une erreur est survenue lors de la création de la diapositive."
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">
          Créer une diapositive pour le deck #{deckId || "?"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">
              Titre de la diapositive
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="mt-1 w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label htmlFor="kind" className="block text-sm font-medium text-gray-700">
              Type de slide
            </label>
            <select
              id="kind"
              name="kind"
              value={formData.kind}
              onChange={handleChange}
              className="mt-1 w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="title">Titre</option>
              <option value="text">Texte</option>
              <option value="image">Image</option>
              <option value="split">Split</option>
              <option value="list">Liste</option>
              <option value="quote">Citation</option>
              <option value="code">Code</option>
            </select>
          </div>

          <div>
            <label htmlFor="content" className="block text-sm font-medium text-gray-700">
              Contenu
            </label>
            <textarea
              id="content"
              name="content"
              value={formData.content}
              onChange={handleChange}
              rows="4"
              required
              className="mt-1 w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label htmlFor="bg" className="block text-sm font-medium text-gray-700">
              Couleur de fond
            </label>
            <input
              type="color"
              id="bg"
              name="bg"
              value={formData.bg}
              onChange={handleChange}
              className="mt-1 w-16 h-10 p-1 border-gray-300 rounded-lg"
            />
          </div>

          <div>
            <label htmlFor="order" className="block text-sm font-medium text-gray-700">
              Ordre
            </label>
            <input
              type="number"
              id="order"
              name="order"
              value={formData.order}
              onChange={handleChange}
              className="mt-1 w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {error && <p className="text-red-500 text-center">{error}</p>}
          {success && <p className="text-green-600 text-center">{success}</p>}

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition"
          >
            Créer la diapositive
          </button>
        </form>

        <p className="text-center text-gray-600 mt-4">
          <button onClick={() => navigate(-1)} className="text-blue-600 hover:underline">
            ← Retour
          </button>
        </p>
      </div>

      <button
        type="button"
        onClick={() => navigate("/decks")}
        className="mt-4 w-full bg-gray-600 hover:bg-gray-700 text-white font-semibold py-2 rounded-lg transition duration-200"
      >
          ← Mes Decks
      </button>
    </div>
  );
};

export default CreateSlides;
