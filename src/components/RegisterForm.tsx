import { useState } from "react";
import { useAuth } from "../context/AuthContext";

const API_URL = "http://localhost:5000/auth/register";

const RegisterForm = ({ onSwitchToLogin }: { onSwitchToLogin: () => void }) => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, username, password }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Inscription API Response:", data);
        if (data.token) {
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
          type="text"
          className="form-control"
          placeholder="Nom d'utilisateur"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
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
      <button type="submit" className="btn btn-primary w-100">Inscription</button>
      <button type="button" className="btn btn-link w-100 mt-2" onClick={onSwitchToLogin}>
        Déjà un compte ? Connectez-vous
      </button>
    </form>
  );
};

export default RegisterForm;