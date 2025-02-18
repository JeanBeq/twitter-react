import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Post } from "../types";

const API_URL = "http://localhost:5000/posts";

const PostList = () => {
  // État pour stocker les posts
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    // Fait une requête pour récupérer les posts
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => setPosts(data))
      .catch((err) => {
        console.error("Erreur:", err);
        // Utilise les données en cache en cas d'erreur
        caches.match(API_URL).then((response) => {
          if (response) {
            response.json().then((cachedData) => setPosts(cachedData));
          }
        });
      });
  }, []);

  return (
    <div className="container mt-4">
      <h2>Derniers posts</h2>
      <div className="list-group">
        {posts.map((post) => (
          <div key={post.id} className="list-group-item">
            <Link to={`/user/${post.user.username}`}>
              <strong>@{post.user.username}</strong>
            </Link>
            <small className="text-muted">{new Date(post.created_at).toLocaleString()}</small>
            <p>{post.content}</p>
            <div className="d-flex justify-content-end gap-3">
              <i className="bi bi-heart"></i>
              <i className="bi bi-arrow-repeat"></i>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostList;