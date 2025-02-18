import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { token } = useAuth();

  if (!token) {
    // Redirige vers la page d'accueil si l'utilisateur n'est pas authentifié
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;