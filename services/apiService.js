// src/services/apiService.js
import axios from 'axios';

const apiUrl = 'http://localhost:5000/api'; // Change to your backend URL

// API Service for Factions
export const createFaction = async (factionData) => {
  try {
    const response = await axios.post(${apiUrl}/factions/create, factionData);
    return response.data;
  } catch (error) {
    console.error('Error creating faction:', error);
    throw error;
  }
};


export const apiRequest = async (url, method, data, token) => {
  try {
    const response = await axios({
      url: ${apiUrl}${url},
      method,
      headers: {
        'Authorization': Bearer ${token}
      },
      data,
    });
    return response.data;
  } catch (error) {
    console.error('API Request failed:', error);
    throw error;
  }
};
// API Service for NFT Minting
export const mintNFT = async (nftData) => {
  try {
    const response = await axios.post(${apiUrl}/nfts/mint, nftData);
    return response.data;
  } catch (error) {
    console.error('Error minting NFT:', error);
    throw error;
  }
};

// API Service for Battle
export const startBattle = async (battleData) => {
  try {
    const response = await axios.post(${apiUrl}/battle/start, battleData);
    return response.data;
  } catch (error) {
    console.error('Error starting battle:', error);
    throw error;
  }
};