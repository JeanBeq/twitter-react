import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Post } from "../types";

interface User {
  id: number;
  username: string;
  createdAt: string;
  updatedAt: string;
  posts: Post[];
}

const UserProfile = () => {
  const { username } = useParams<{ username: string }>();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    fetch(`http://localhost:5000/users/${username}`)
      .then((res) => res.json())
      .then((data) => setUser(data))
      .catch((err) => console.error("Erreur:", err));
  }, [username]);

  if (!user) {
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