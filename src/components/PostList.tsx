import { useEffect, useState } from "react";
import { Post } from "../types";

const API_URL = "http://localhost:5000/posts"; // Change si nécessaire

const PostList = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => setPosts(data))
      .catch((err) => console.error("Erreur:", err));
  }, []);

  return (
    <div className="container mt-4">
      <h2>Derniers posts</h2>
      <div className="list-group">
        {posts.map((post) => (
          <div key={post.id} className="list-group-item">
            <strong>@{post.author}</strong> <small className="text-muted">{new Date(post.created_at).toLocaleString()}</small>
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
