import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Post } from "../types";
import { useAuth } from "../context/AuthContext";

// Interface pour représenter un utilisateur
interface User {
  id: number;
  username: string;
  createdAt: string;
  updatedAt: string;
  posts: Post[];
}

const UserProfile = () => {
  // Récupère le paramètre 'username' de l'URL
  const { username } = useParams<{ username: string }>();
  // État pour stocker les informations de l'utilisateur
  const [user, setUser] = useState<User | null>(null);
  // Récupère le token d'authentification et la fonction de gestion des erreurs
  const { token, handleUnauthorized } = localStorage.getItem("token") ? useAuth() : { token: null, handleUnauthorized: () => {} };

  useEffect(() => {
    if (!token) return;
    // Fait une requête pour récupérer les informations de l'utilisateur
    fetch(`http://localhost:5000/users/${username}`, {
      headers: {
        "Authorization": `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (res.status === 401) {
          // Gère les erreurs d'authentification
          handleUnauthorized();
        } else {
          return res.json();
        }
      })
      .then((data) => setUser(data))
      .catch((err) => console.error("Erreur:", err));
  }, [username, token, handleUnauthorized]);

  if (!user) {
    // Affiche un message de chargement si les données ne sont pas encore disponibles
    return <div>Chargement...</div>;
  }

  return (
    <div className="container mt-4">
      <h2>Profil de {user.username}</h2>
      <p>Membre depuis: {new Date(user.createdAt).toLocaleDateString()}</p>
      <h3>Posts</h3>
      <div className="list-group">
        {user.posts.map((post) => (
          <div key={post.id} className="list-group-item">
            <small className="text-muted">{new Date(post.created_at).toLocaleString()}</small>
            <p>{post.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserProfile;