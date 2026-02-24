import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface User {
  id: string;
  fullName: string;
  email: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (fullName: string, email: string, password: string) => Promise<void>;
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
          // Simulate API call
          await new Promise((resolve) => setTimeout(resolve, 500));

          // Validate credentials
          if (!email || !password) {
            throw new Error('Email and password are required');
          }

          if (!email.includes('@')) {
            throw new Error('Invalid email format');
          }

          if (password.length < 6) {
            throw new Error('Password must be at least 6 characters');
          }

          // Create user object
          const user: User = {
            id: Math.random().toString(36).substr(2, 9),
            fullName: email.split('@')[0],
            email,
          };

          set({
            user,
            isAuthenticated: true,
            isLoading: false,
            error: null,
          });
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : 'Login failed';
          set({
            isLoading: false,
            error: errorMessage,
            isAuthenticated: false,
            user: null,
          });
          throw error;
        }
      },

      signup: async (fullName: string, email: string, password: string) => {
        set({ isLoading: true, error: null });
        try {
          // Simulate API call
          await new Promise((resolve) => setTimeout(resolve, 500));

          // Validate inputs
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

          // Create user object
          const user: User = {
            id: Math.random().toString(36).substr(2, 9),
            fullName,
            email,
          };

          set({
            user,
            isAuthenticated: true,
            isLoading: false,
            error: null,
          });
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : 'Signup failed';
          set({
            isLoading: false,
            error: errorMessage,
            isAuthenticated: false,
            user: null,
          });
          throw error;
        }
      },

      logout: () => {
        set({
          user: null,
          isAuthenticated: false,
          error: null,
        });
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
