import { useState } from "react";
import PostList from "./components/PostList";
import NewPostForm from "./components/NewPostForm";
import HomeSection from "./components/HomeSection";
import { Post } from "./types";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

const App = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  const addPost = (newPost: Post) => {
    setPosts([newPost, ...posts]);
  };

  return (
    <div className="container-fluid d-flex flex-column bg-dark text-white ">
      <div className="row flex-grow-1">
      <div className="col-3 border-end border-white text-white d-flex flex-column align-items-start p-3 ps-5">
        <HomeSection />
      </div>
        <div className="col-6 overflow-auto">
          <NewPostForm onPostAdded={addPost} />
          <PostList />
        </div>
        <div className="col-3 border-start border-white d-flex flex-column align-items-center">
          <h2 className="mt-5">Tendances</h2>
        </div>
      </div>
    </div>
  );
};

export default App;