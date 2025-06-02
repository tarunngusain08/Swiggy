import api from './api';
import { CartItem } from '../types';

interface CreateOrderData {
  items: CartItem[];
  deliveryAddress: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
  };
  paymentMethod: string;
}

export const orderService = {
  async create(data: CreateOrderData) {
    return await api.post('/orders', data);
  },

  async getAll(params?: { page?: number; limit?: number }) {
    return await api.get('/orders', { params });
  },

  async getById(id: string) {
    return await api.get(`/orders/${id}`);
  },

  async trackOrder(id: string) {
    return await api.get(`/orders/${id}/track`);
  },

  async cancelOrder(id: string) {
    return await api.post(`/orders/${id}/cancel`);
  },
  
  async rateOrder(id: string, rating: number, review?: string) {
    return await api.post(`/orders/${id}/rate`, { rating, review });
  }
};
