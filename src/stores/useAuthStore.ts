// src/stores/useAuthStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { AuthUser, LoginCredentials } from "../types";

interface AuthState {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (credentials: LoginCredentials) => Promise<void>;
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

      login: async (credentials) => {
        set({ isLoading: true, error: null });

        try {
          // Simulación de API call
          await new Promise((resolve) => setTimeout(resolve, 1500));

          // Mock validation
          if (
            credentials.email === "mozo@restaurant.com" &&
            credentials.password === "123456"
          ) {
            const user: AuthUser = {
              id: "1",
              nombre: "Carlos Rodríguez",
              email: credentials.email,
              token: "mock-jwt-token",
            };

            set({
              user,
              isAuthenticated: true,
              isLoading: false,
              error: null,
            });
          } else {
            throw new Error("Credenciales incorrectas");
          }
        } catch (error) {
          set({
            error: error instanceof Error ? error.message : "Error de login",
            isLoading: false,
          });
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
      name: "auth-storage",
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
