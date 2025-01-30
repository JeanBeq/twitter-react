import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PostList from "./components/PostList";
import NewPostForm from "./components/NewPostForm";
import HomeSection from "./components/HomeSection";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import UserProfile from "./pages/UserProfil";
import { AuthProvider, useAuth } from "./context/AuthContext";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useState } from "react";
import { Post } from "./types";

const AppContent = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const { token, username } = useAuth();
  const [isRegistering, setIsRegistering] = useState(false);

  const addPost = (newPost: Post) => {
    setPosts([newPost, ...posts]);
  };

  return (
    <div className="container-fluid d-flex flex-column bg-dark text-white vh-100">
      <div className="row flex-grow-1">
        <div className="col-3 border-end border-white text-white d-flex flex-column align-items-start p-3 ps-5">
          <HomeSection />
        </div>
        <div className="col-6 overflow-auto mt-5">
          <Routes>
            <Route path="/" element={token ? (
              <>
                <h2>Bienvenue, {username}!</h2>
                <NewPostForm onPostAdded={addPost} />
                <PostList />
              </>
            ) : (
              isRegistering ? (
                <RegisterForm onSwitchToLogin={() => setIsRegistering(false)} />
              ) : (
                <LoginForm onSwitchToRegister={() => setIsRegistering(true)} />
              )
            )} />
            <Route path="/user/:username" element={<UserProfile />} />
          </Routes>
        </div>
        <div className="col-3 border-start border-white d-flex flex-column align-items-center">
          <h2 className="mt-5">Tendances</h2>
        </div>
      </div>
    </div>
  );
};

const App = () => (
  <AuthProvider>
    <Router>
      <AppContent />
    </Router>
  </AuthProvider>
);

export default App;