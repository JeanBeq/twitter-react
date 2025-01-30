import { useState } from "react";
import { Post } from "../types";
import { useAuth } from "../context/AuthContext";
import { openDB } from "idb";

const API_URL = "http://localhost:5000/posts";

const NewPostForm = ({ onPostAdded, refreshPosts }: { onPostAdded: (post: Post) => void, refreshPosts: () => void }) => {
  const [content, setContent] = useState("");
  const { token } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content) return;

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({ content }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const newPost = await response.json();
      onPostAdded(newPost);
      setContent("");
      refreshPosts(); // Appeler la fonction de rafraîchissement des tweets
    } catch (err) {
      console.error("Erreur:", err);
      await saveForLater({ content, token });
    }
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

async function saveForLater(data: any) {
  const db = await openDB('offline-sync', 1, {
    upgrade(db) {
      db.createObjectStore('posts', { keyPath: 'id', autoIncrement: true });
    }
  });

  await db.add('posts', data);
}

export default NewPostForm;