import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface User {
  id: string;
  fullName: string;
  email: string;
  picture?: string;   // Google profile photo URL
  provider?: 'email' | 'google';
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (fullName: string, email: string, password: string) => Promise<void>;
  googleLogin: (googleUser: { sub: string; name: string; email: string; picture: string }) => void;
  logout: () => void;
  clearError: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      login: async (email: string, password: string) => {
        set({ isLoading: true, error: null });
        try {
          await new Promise((resolve) => setTimeout(resolve, 500));

          if (!email || !password) {
            throw new Error('Email and password are required');
          }
          if (!email.includes('@')) {
            throw new Error('Invalid email format');
          }
          if (password.length < 6) {
            throw new Error('Password must be at least 6 characters');
          }

          const user: User = {
            id: Math.random().toString(36).substr(2, 9),
            fullName: email.split('@')[0],
            email,
            provider: 'email',
          };

          set({ user, isAuthenticated: true, isLoading: false, error: null });
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : 'Login failed';
          set({ isLoading: false, error: errorMessage, isAuthenticated: false, user: null });
          throw error;
        }
      },

      signup: async (fullName: string, email: string, password: string) => {
        set({ isLoading: true, error: null });
        try {
          await new Promise((resolve) => setTimeout(resolve, 500));

          if (!fullName || !email || !password) {
            throw new Error('All fields are required');
          }
          if (!email.includes('@')) {
            throw new Error('Invalid email format');
          }
          if (password.length < 6) {
            throw new Error('Password must be at least 6 characters');
          }
          if (fullName.length < 2) {
            throw new Error('Full name must be at least 2 characters');
          }

          const user: User = {
            id: Math.random().toString(36).substr(2, 9),
            fullName,
            email,
            provider: 'email',
          };

          set({ user, isAuthenticated: true, isLoading: false, error: null });
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : 'Signup failed';
          set({ isLoading: false, error: errorMessage, isAuthenticated: false, user: null });
          throw error;
        }
      },

      // Google One-Tap / OAuth login
      googleLogin: (googleUser) => {
        const user: User = {
          id: googleUser.sub,
          fullName: googleUser.name,
          email: googleUser.email,
          picture: googleUser.picture,
          provider: 'google',
        };
        set({ user, isAuthenticated: true, isLoading: false, error: null });
      },

      logout: () => {
        set({ user: null, isAuthenticated: false, error: null });
      },

      clearError: () => {
        set({ error: null });
      },
    }),
    {
      name: 'auth-storage',
    }
  )
);
