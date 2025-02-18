import { Link } from "react-router-dom";
import { Post } from "../types";

const IMAGE_BASE_URL = "http://localhost:5000";

const PostList = ({ posts }: { posts: Post[] }) => {
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
            {post.photoUrl && <img src={`${IMAGE_BASE_URL}${post.photoUrl}`} alt="Post photo" className="img-fluid" />}
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