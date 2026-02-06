import axios from 'axios';

const API_Base = '/api';

export const getCrises = async () => {
  const response = await axios.get(`${API_Base}/crisis`);
  return response.data;
};

export const getRecommendations = async (crisisId) => {
  const response = await axios.get(`${API_Base}/recommendations/${crisisId}`);
  return response.data;
};

export const loginUser = async (credentials) => {
  const response = await axios.post(`${API_Base}/login`, credentials);
  return response.data;
};

export const confirmAction = async (data) => {
  const response = await axios.post(`${API_Base}/confirm`, data);
  return response.data;
};

export const reportCrisis = async (data) => {
  const response = await axios.post(`${API_Base}/report`, data);
  return response.data;
};
