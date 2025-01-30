import { createContext, useState, ReactNode, useContext, useEffect } from "react";

interface AuthContextType {
  token: string | null;
  username: string | null;
  login: (token: string, username: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(localStorage.getItem("token"));
  const [username, setUsername] = useState<string | null>(localStorage.getItem("username"));

  useEffect(() => {
    caches.open('twitter-react-cache-v1').then((cache) => {
      cache.match('username').then((response) => {
        if (response) {
          response.text().then((cachedUsername) => {
            setUsername(cachedUsername);
          });
        }
      });
    });
  }, []);

  const login = (token: string, username: string) => {
    setToken(token);
    setUsername(username);
    localStorage.setItem("token", token);
    localStorage.setItem("username", username);

    caches.open('twitter-react-cache-v1').then((cache) => {
      cache.put('username', new Response(username));
    });
  };

  const logout = () => {
    setToken(null);
    setUsername(null);
    localStorage.removeItem("token");
    localStorage.removeItem("username");

    caches.open('twitter-react-cache-v1').then((cache) => {
      cache.delete('username');
    });
  };

  return (
    <AuthContext.Provider value={{ token, username, login, logout }}>
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