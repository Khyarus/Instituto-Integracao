import { ReactNode, useEffect } from "react";
import { useNavigate } from "@tanstack/react-router";
import { useAuthStore, UserRole } from "@/stores/useAuthStore";
import { toast } from "sonner";

interface PrivateRouteProps {
  children: ReactNode;
  requiredRole?: UserRole;
}

/**
 * PrivateRoute
 * 
 * Enforces authentication and role-based access control.
 * Checks for auth token presence and user role from Zustand.
 */
export const PrivateRoute = ({ children, requiredRole }: PrivateRouteProps) => {
  const { isAuthenticated, user } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      toast.error("Acesso negado. Por favor, faça login.");
      navigate({ to: "/login" });
      return;
    }

    if (requiredRole && user?.role !== requiredRole) {
      if (requiredRole === "admin" && user?.role === "user") {
        toast.error("Acesso negado. Você não tem permissão de administrador.");
        navigate({ to: "/login" }); // or /minha-conta as requested in point 2
      } else {
        toast.error("Acesso negado. Você não tem permissão para esta área.");
        navigate({ to: "/" });
      }
    }
  }, [isAuthenticated, user, requiredRole, navigate]);

  if (!isAuthenticated || (requiredRole && user?.role !== requiredRole)) {
    return null;
  }

  return <>{children}</>;
};
