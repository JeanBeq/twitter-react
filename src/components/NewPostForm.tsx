import { useState } from "react";
import { Post } from "../types";

const API_URL = "http://localhost:5000/posts";

const NewPostForm = ({ onPostAdded }: { onPostAdded: (post: Post) => void }) => {
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!author || !content) return;

    fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ author, content }),
    })
      .then((res) => res.json())
      .then((newPost) => {
        onPostAdded(newPost);
        setAuthor("");
        setContent("");
      })
      .catch((err) => console.error("Erreur:", err));
  };

  return (
    <form onSubmit={handleSubmit} className="container mt-4">
      <div className="mb-3"> 
        <input
          type="text"
          className="form-control"
          placeholder="Votre nom"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          required
        />
      </div>
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
