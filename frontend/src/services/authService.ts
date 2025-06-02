import api from './api';

interface LoginCredentials {
  email: string;
  password: string;
}

interface RegisterData {
  name: string;
  email: string;
  password: string;
  phone: string;
}

export const authService = {
  async login(credentials: LoginCredentials) {
    const response = await api.post<{ token?: string }>('/auth/login', credentials);
    if (response.data?.token) {
      localStorage.setItem('token', response.data.token);
    }
    return response.data;
  },

  async register(data: RegisterData) {
    const response = await api.post<{ token?: string }>('/auth/register', data);
    if (response.data?.token) {
      localStorage.setItem('token', response.data.token);
    }
    return response.data;
  },

  async logout() {
    localStorage.removeItem('token');
    return await api.post('/auth/logout');
  },

  async forgotPassword(email: string) {
    return await api.post('/auth/forgot-password', { email });
  },

  async resetPassword(token: string, password: string) {
    return await api.post('/auth/reset-password', { token, password });
  },

  async getProfile() {
    return await api.get('/auth/profile');
  }
};
