import api from "./api";


export const createSlide = async (deckId, slideData) => {
  const token = localStorage.getItem("token");

  const response = await api.post(
    `/decks/${deckId}/slides`,
    {
      kind: slideData.kind || "text", // Par défaut : slide texte
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
};

// Récupérer toutes les slides d’un deck
export const getSlidesByDeck = async (deckId) => {
  const token = localStorage.getItem("token");
  const response = await api.get(`/decks/${deckId}/slides`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data.slides;
};


export const updateSlide = async (deckId, slideId, slideData) => {
  const token = localStorage.getItem("token");
  const response = await api.put(
    `/decks/${deckId}/slides/${slideId}`,
    slideData,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return response.data;
};


export const deleteSlide = async (deckId, slideId) => {
  const token = localStorage.getItem("token");
  const response = await api.delete(`/decks/${deckId}/slides/${slideId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export default {
  createSlide,
  getSlidesByDeck,
  updateSlide,
  deleteSlide,
};
