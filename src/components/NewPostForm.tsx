import { useState, useRef } from "react";
import { Post } from "../types";
import { openDB } from "idb";

const API_URL = "http://localhost:5000/posts";
const token = localStorage.getItem("token");

const NewPostForm = ({ onPostAdded, refreshPosts }: { onPostAdded: (post: Post) => void, refreshPosts: () => void }) => {
  // États pour stocker le contenu du post et la photo
  const [content, setContent] = useState("");
  const [photo, setPhoto] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content) return;

    const formData = new FormData();
    formData.append("content", content);
    if (photo) {
      formData.append("photo", photo);
    }

    try {
      // Fait une requête pour ajouter un nouveau post
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const newPost = await response.json();
      onPostAdded(newPost);
      refreshPosts();
    } catch (err) {
      console.error("Erreur:", err);
      await saveForLater({ content, token, photo });
    } finally {
      setContent("");
      setPhoto(null);
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLTextAreaElement>) => {
    const items = e.clipboardData.items;
    for (const item of items) {
      if (item.type.startsWith("image/")) {
        const file = item.getAsFile();
        if (file) {
          setPhoto(file);
        }
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="container mt-4">
      <div className="mb-3 position-relative">
        <textarea
          className="form-control"
          placeholder="Quoi de neuf ?"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          onPaste={handlePaste}
          required
        />
        <input
          type="file"
          className="d-none"
          ref={fileInputRef}
          onChange={(e) => setPhoto(e.target.files ? e.target.files[0] : null)}
        />
        <button
          type="button"
          className="btn btn-link position-absolute top-0 end-0"
          onClick={() => fileInputRef.current?.click()}
        >
          <i className="bi bi-image"></i>
        </button>
      </div>
      {photo && (
        <div className="mb-3">
          <img src={URL.createObjectURL(photo)} alt="Preview" className="img-fluid" />
        </div>
      )}
      <button type="submit" className="btn btn-primary w-100">Poster</button>
    </form>
  );
};

// Fonction pour sauvegarder le post pour plus tard en cas d'erreur réseau
async function saveForLater(data: any) {
  const db = await openDB('offline-sync', 1, {
    upgrade(db) {
      db.createObjectStore('posts', { autoIncrement: true });
    },
  });

  await db.add('posts', JSON.stringify({ ...data, token }));

  const serviceWorker: any = await navigator.serviceWorker.ready;
  await serviceWorker.sync.register('sync-new-posts');
}

export default NewPostForm;