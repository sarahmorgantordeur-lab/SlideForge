import api from "./api";

export const createSlide = async (slideData) => {
  const token = localStorage.getItem("token");
  const response = await api.post(`/slides`, slideData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

