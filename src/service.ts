// src/service.ts
import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL
});

export const fetchProducts = async () => {
  try {
    const response = await api.get('/products');
    return response.data;
  } catch (error) {
    console.error('Api fetch error!', error);
    return [];
  }
};
