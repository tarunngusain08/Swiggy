import api from './api';

export const restaurantService = {
  async getAll(params?: { 
    page?: number; 
    limit?: number;
    search?: string;
    cuisine?: string;
    sort?: string;
  }) {
    return await api.get('/restaurants', { params });
  },

  async getById(id: string) {
    return await api.get(`/restaurants/${id}`);
  },

  async getMenu(id: string) {
    return await api.get(`/restaurants/${id}/menu`);
  },

  async getReviews(id: string, params?: { page?: number; limit?: number }) {
    return await api.get(`/restaurants/${id}/reviews`, { params });
  }
};
