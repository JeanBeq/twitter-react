import { useState } from "react";
import { useAuth } from "../context/AuthContext";

const API_URL = "http://localhost:5000/auth/login";

const LoginForm = ({ onSwitchToRegister }: { onSwitchToRegister: () => void }) => {
  // États pour stocker l'email et le mot de passe
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Fait une requête pour se connecter
    fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.token) {
          // Si la connexion est réussie, enregistre le token et le nom d'utilisateur
          login(data.token, data.user.username);
        } else {
          console.error("Erreur:", data.error);
        }
      })
      .catch((err) => console.error("Erreur:", err));
  };

  return (
    <form onSubmit={handleSubmit} className="container mt-4">
      <div className="mb-3">
        <input
          type="email"
          className="form-control"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="mb-3">
        <input
          type="password"
          className="form-control"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <button type="submit" className="btn btn-primary w-100">Connexion</button>
      <button type="button" className="btn btn-link w-100 mt-2" onClick={onSwitchToRegister}>
        Pas de compte ? Inscrivez-vous
      </button>
    </form>
  );
};

export default LoginForm;