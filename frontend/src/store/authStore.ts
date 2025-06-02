import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
}

interface AuthState {
  isAuthenticated: boolean;
  token: string | null;
  user: User | null;
  loading: boolean;
  setAuth: (token: string, user: User) => void;
  setLoading: (loading: boolean) => void;
  logout: () => void;
  updateUser: (user: Partial<User>) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      token: null,
      user: null,
      loading: true,

      setAuth: (token, user) => set({ 
        isAuthenticated: true, 
        token, 
        user,
        loading: false 
      }),

      setLoading: (loading) => set({ loading }),

      logout: () => {
        localStorage.removeItem('token');
        set({ 
          isAuthenticated: false, 
          token: null, 
          user: null 
        });
      },

      updateUser: (updatedUser) => set((state) => ({
        user: state.user ? { ...state.user, ...updatedUser } : null
      }))
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        isAuthenticated: state.isAuthenticated,
        token: state.token,
        user: state.user
      })
    }
  )
);
