import { useState } from "react";
import { Post } from "../types";
import { openDB } from "idb";

const API_URL = "http://localhost:5000/posts";
const token = localStorage.getItem("token");

const NewPostForm = ({ onPostAdded, refreshPosts }: { onPostAdded: (post: Post) => void, refreshPosts: () => void }) => {
  const [content, setContent] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content) return;

    try {
      // Fait une requête pour ajouter un nouveau post
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
      refreshPosts();
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

// Fonction pour sauvegarder le post pour plus tard en cas d'erreur réseau
async function saveForLater(data: any){
  const db = await openDB(
      'offline-sync',
      1,
      {
          upgrade(db){
              db.createObjectStore('posts', {autoIncrement: true})
          }
      }
  );

  await db.add('posts', JSON.stringify({...data, token: {token}}));

  const serviceWorker : any = await navigator.serviceWorker.ready;
  await serviceWorker.sync.register('sync-new-posts');
}

export default NewPostForm;