import { useState } from "react";
import { Post } from "../types";
import { useAuth } from "../context/AuthContext";

const API_URL = "http://localhost:5000/posts";

const NewPostForm = ({ onPostAdded }: { onPostAdded: (post: Post) => void }) => {
  const [content, setContent] = useState("");
  const { token } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content) return;

    fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify({ content }),
    })
      .then((res) => res.json())
      .then((newPost) => {
        onPostAdded(newPost);
        setContent("");
      })
      .catch((err) => console.error("Erreur:", err));
  };

  return (
    <form onSubmit={handleSubmit} className="container mt-4">
      <div className="mb-3">
        <textarea
          className="form-control"
          placeholder="Quoi de neuf ?"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
      </div>
      <button type="submit" className="btn btn-primary w-100">Poster</button>
    </form>
  );
};

export default NewPostForm;