import axios from "axios";
import { useAuthStore } from "@/stores/useAuthStore";
import { toast } from "sonner";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

/**
 * Axios Instance Configuration
 * 
 * Implements security best practices:
 * - withCredentials: true (enables sending/receiving HttpOnly cookies)
 * - X-Requested-With: CSRF mitigation
 */
export const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    "X-Requested-With": "XMLHttpRequest",
    "Content-Type": "application/json",
  },
});

// Error message mapping in Portuguese
const getErrorMessage = (status: number) => {
  switch (status) {
    case 400:
      return "Dados inválidos. Verifique as informações e tente novamente.";
    case 401:
      return "Sessão expirada. Faça login novamente.";
    case 403:
      return "Você não tem permissão para realizar esta ação.";
    case 404:
      return "O recurso solicitado não foi encontrado.";
    case 500:
      return "Erro interno. Tente novamente em alguns instantes.";
    default:
      return "Ocorreu um erro inesperado. Tente novamente.";
  }
};

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const status = error.response.status;
      const message = getErrorMessage(status);

      if (status === 401) {
        // Clear auth state and redirect on 401 Unauthorized
        useAuthStore.getState().logout();
        toast.error(message);
        
        // Use window.location for hard redirect to clear all states if needed,
        // or let the application routing handle it.
        if (window.location.pathname !== "/login") {
          window.location.href = "/login";
        }
      } else {
        toast.error(message);
      }
    } else {
      toast.error("Erro de conexão com o servidor. Verifique sua internet.");
    }
    return Promise.reject(error);
  }
);
