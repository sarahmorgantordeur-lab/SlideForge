import React, { useEffect, useState } from "react";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import { getSlidesByDeckId } from "../services/deckService";

const SlidesDeck = () => {
  const { id } = useParams(); // /decks/:id
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const deckId = id || searchParams.get("deckId"); // Supporte les 2 formats
  const [slides, setSlides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchSlides = async () => {
      try {
        if (!deckId) throw new Error("Aucun ID de deck trouvé !");
        const data = await getSlidesByDeckId(deckId);
        setSlides(data);
      } catch (err) {
        setError(err.message || "Erreur lors du chargement des slides.");
      } finally {
        setLoading(false);
      }
    };
    fetchSlides();
  }, [deckId]);

  if (loading) {
    return <p className="text-center mt-8">Chargement des slides...</p>;
  }

  if (error) {
    return (
      <div className="text-center mt-8">
        <p className="text-red-600">{error}</p>
        <button
          onClick={() => navigate("/create-deck")}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg"
        >
          Retour
        </button>
      </div>
    );
  }

  if (slides.length === 0) {
    return (
      <div className="text-center mt-10">
        <p>Aucune slide pour ce deck pour le moment.</p>
        <button
          onClick={() => navigate(`/create-slides?deckId=${deckId}`)}
          className="mt-4 bg-green-600 text-white px-4 py-2 rounded-lg"
        >
          ➕ Ajouter une slide
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">
          Slides du deck #{deckId}
        </h1>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {slides.map((slide) => (
            <div
              key={slide.id}
              className="bg-white shadow-lg rounded-xl p-4 border border-gray-200"
              style={{ backgroundColor: slide.bg || "#fff" }}
            >
              <h2 className="text-xl font-semibold mb-2">{slide.title}</h2>
              <p className="text-sm text-gray-600 mb-3 italic">
                Type : {slide.kind}
              </p>
              {slide.kind === "image" ? (
                <img
                  src={slide.content}
                  alt={slide.title}
                  className="w-full h-40 object-cover rounded-md"
                />
              ) : (
                <p className="text-gray-800">{slide.content}</p>
              )}
              <p className="text-right text-xs text-gray-500 mt-2">
                Ordre : {slide.order}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <button
            onClick={() => navigate(`/create-slides?deckId=${deckId}`)}
            className="bg-green-600 text-white px-5 py-2 rounded-lg"
          >
            ➕ Ajouter une slide
          </button>
        </div>
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

export default SlidesDeck;
