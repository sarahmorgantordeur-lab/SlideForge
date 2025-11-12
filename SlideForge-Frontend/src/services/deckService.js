import api from "./api";

const deckService = {
  // Récupérer tous les decks de l'utilisateur connecté
  getAll: async () => {
    const token = localStorage.getItem("token");
    const response = await api.get("/decks", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data.decks;
  },

  //  Récupérer un deck par son ID
  getById: async (id) => {
    const token = localStorage.getItem("token");
    const response = await api.get(`/decks/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data.deck;
  },

  // Créer un nouveau deck et renvoyer l'objet complet (y compris son id)
  create: async (data) => {
    const token = localStorage.getItem("token");
    const response = await api.post("/decks", data, {
      headers: { Authorization: `Bearer ${token}` },
    });

    // 🧠 Certains backends renvoient { success, deck }, d'autres { id, title, ... }
    // On unifie le format pour être sûr d’obtenir l’id
    const deck = response.data.deck || response.data;
    return deck; // deck.id sera disponible ici
  },

  // Mettre à jour un deck existant
  update: async (id, data) => {
    const token = localStorage.getItem("token");
    const response = await api.put(`/decks/${id}`, data, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  },

  //  Supprimer un deck
  delete: async (id) => {
    const token = localStorage.getItem("token");
    const response = await api.delete(`/decks/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  },

  // Récupérer toutes les slides d’un deck
  getSlidesByDeckId: async (deckId) => {
    const token = localStorage.getItem("token");
    const response = await api.get(`/decks/${deckId}/slides`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data.slides;
  },

  // Créer une slide dans un deck existant
  createSlideInDeck: async (deckId, slideData) => {
    const token = localStorage.getItem("token");
    const response = await api.post(
      `/decks/${deckId}/slides`,
      {
        kind: slideData.kind || "text",
        title: slideData.title,
        content: slideData.content,
        bg: slideData.bg || "#ffffff",
        order: slideData.order ?? 0,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data;
  },

    getSlidesByDeckId: async (deckId) => {
    const token = localStorage.getItem("token");
    const response = await api.get(`/decks/${deckId}/slides`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data.slides;
  },
};








export const createDeck = deckService.create;
export const getDecks = deckService.getAll;
export const getDeckById = deckService.getById;
export const getSlidesByDeckId = deckService.getSlidesByDeckId;
export const createSlideInDeck = deckService.createSlideInDeck;

export default deckService;
