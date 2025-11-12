import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getDecks } from "../services/deckService";

const Decks = () => {
  const [decks, setDecks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDecks = async () => {
      setLoading(true);
      setError("");
      try {
        const userDecks = await getDecks();
        setDecks(userDecks);
      } catch (err) {
        console.error(err);
        setError(
          err.response?.data?.message || "Erreur lors de la récupération des decks."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchDecks();
  }, []);

  if (loading) return <p className="text-center mt-10">Chargement des decks...</p>;
  if (error) return <p className="text-red-500 text-center mt-10">{error}</p>;

  return (
    <div className="min-h-screen p-8 bg-gray-100">
      <h1 className="text-3xl font-bold mb-6 text-center">Mes Decks</h1>
      {decks.length === 0 ? (
        <p className="text-center text-gray-600">Vous n'avez encore créé aucun deck.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {decks.map((deck) => (
            <div
              key={deck.id}
              className="bg-white shadow-lg rounded-2xl p-6 cursor-pointer hover:shadow-xl transition duration-200"
              onClick={() => navigate(`/decks/${deck.id}/slides`)}
            >
              <h2 className="text-xl font-semibold mb-2">{deck.title}</h2>
              <p className="text-gray-500">Thème : {deck.theme}</p>
              <p className="text-gray-500">Ratio : {deck.ratio}</p>
              <p className="text-gray-400 mt-2 text-sm">
                Créé le : {new Date(deck.createdAt).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      )}

      <div className="mt-8 text-center">
        <button
          onClick={() => navigate("/create-deck")}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition duration-200"
        >
          + Créer un nouveau deck
        </button>
      </div>
    </div>
  );
};

export default Decks;
