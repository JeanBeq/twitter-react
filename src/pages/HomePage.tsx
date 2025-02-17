import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import PostList from "../components/PostList";
import NewPostForm from "../components/NewPostForm";
import HomeSection from "../components/HomeSection";
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";
import UserProfile from "./UserProfil";
import ProtectedRoute from "../components/ProtectedRoute";
import { useAuth } from "../context/AuthContext";
import { Post } from "../types";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

const HomePage = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const { token, username } = useAuth();
  const [isRegistering, setIsRegistering] = useState(false);

  const addPost = (newPost: Post) => {
    setPosts([newPost, ...posts]);
  };

  const refreshPosts = () => {
    fetch("http://localhost:5000/posts")
      .then((res) => res.json())
      .then((data) => setPosts(data))
      .catch((err) => console.error("Erreur:", err));
  };

  return (
    <div className="container-fluid d-flex flex-column bg-dark text-white min-vh-100">
      <div className="row flex-grow-1">
        <div className="col-3 border-end border-white text-white d-flex flex-column align-items-start p-3 ps-5">
          <HomeSection />
        </div>
        <div className="col-6 overflow-auto mt-5">
          <Routes>
            <Route path="/" element={token ? (
              <>
                <h2>Bienvenue, {username}!</h2>
                <NewPostForm onPostAdded={addPost} refreshPosts={refreshPosts} />
                <PostList />
              </>
            ) : (
              isRegistering ? (
                <RegisterForm onSwitchToLogin={() => setIsRegistering(false)} />
              ) : (
                <LoginForm onSwitchToRegister={() => setIsRegistering(true)} />
              )
            )} />
            <Route path="/user/:username" element={
              <ProtectedRoute>
                <UserProfile />
              </ProtectedRoute>
            } />
          </Routes>
        </div>
        <div className="col-3 border-start border-white d-flex flex-column align-items-center">
          <h2 className="mt-5">Tendances</h2>
        </div>
      </div>
    </div>
  );
};

export default HomePage;