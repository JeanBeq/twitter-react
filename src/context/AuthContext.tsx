import { createContext, useState, ReactNode, useContext } from "react";
import { useNavigate } from "react-router-dom";

interface AuthContextType {
  token: string | null;
  username: string | null;
  login: (token: string, username: string) => void;
  logout: () => void;
  handleUnauthorized: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  // États pour stocker le token et le nom d'utilisateur
  const [token, setToken] = useState<string | null>(localStorage.getItem("token"));
  const [username, setUsername] = useState<string | null>(localStorage.getItem("username"));
  const navigate = useNavigate();

  // Fonction pour se connecter
  const login = (token: string, username: string) => {
    setToken(token);
    setUsername(username);
    localStorage.setItem("token", token);
    localStorage.setItem("username", username);
  };

  // Fonction pour se déconnecter
  const logout = () => {
    setToken(null);
    setUsername(null);
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    navigate("/");
  };

  // Fonction pour gérer les erreurs d'authentification
  const handleUnauthorized = () => {
    logout();
    navigate("/");
  };

  return (
    <AuthContext.Provider value={{ token, username, login, logout, handleUnauthorized }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};