import { create } from 'zustand';
import { login, logout, refreshToken, type LoginCredentials } from '@/lib/api/auth';

interface AuthState {
  user: any | null;
  isLoading: boolean;
  error: string | null;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => Promise<void>;
  refreshToken: () => Promise<void>;
}

export const useAuth = create<AuthState>((set) => ({
  user: null,
  isLoading: false,
  error: null,
  login: async (credentials) => {
    set({ isLoading: true, error: null });
    try {
      const user = await login(credentials);
      set({ user, isLoading: false });
    } catch (error) {
      set({ error: 'Login failed', isLoading: false });
    }
  },
  logout: async () => {
    set({ isLoading: true });
    try {
      await logout();
      set({ user: null, isLoading: false });
    } catch (error) {
      set({ error: 'Logout failed', isLoading: false });
    }
  },
  refreshToken: async () => {
    try {
      const user = await refreshToken();
      set({ user });
    } catch (error) {
      set({ user: null });
    }
  }
}));