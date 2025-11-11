import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createSlide } from "../services/slidesService";

const CreateSlides = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    deckId: "",
    title: "",
    content: "",
    order: ""
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      // ⚡ Nouveau format : on envoie un objet complet au service
      const data = await createSlide({
        deckId: parseInt(formData.deckId, 10),
        title: formData.title,
        content: formData.content,
        order: formData.order ? parseInt(formData.order, 10) : undefined
      });

      console.log("✅ Slide créé :", data);
      setSuccess("La diapositive a été créée avec succès !");
      // Redirige vers la page du deck après 2 secondes
      setTimeout(() => navigate(`/create-deck`), 2000);
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.message ||
          "❌ Une erreur est survenue lors de la création de la diapositive."
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Créer une diapositive</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="deckId" className="block text-sm font-medium text-gray-700">
              ID du deck
            </label>
            <input
              type="number"
              id="deckId"
              name="deckId"
              value={formData.deckId}
              onChange={handleChange}
              required
              className="mt-1 w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="Entrez l’ID du deck"
            />
          </div>

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
              placeholder="Ex : Introduction à la physique"
            />
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
              required
              rows="4"
              className="mt-1 w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="Saisissez le contenu de la diapositive..."
            />
          </div>

          <div>
            <label htmlFor="order" className="block text-sm font-medium text-gray-700">
              Ordre (facultatif)
            </label>
            <input
              type="number"
              id="order"
              name="order"
              value={formData.order}
              onChange={handleChange}
              className="mt-1 w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="Ex : 1"
            />
          </div>

          {error && <p className="text-red-500 text-sm text-center mt-2">{error}</p>}
          {success && <p className="text-green-600 text-sm text-center mt-2">{success}</p>}

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition duration-200"
          >
            Créer la diapositive
          </button>
        </form>

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

export default CreateSlides;
