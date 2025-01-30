import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

function HomeSection() {
  const { token, logout, username  } = useAuth();

  return (
    <div>
      <h1 className="text-white text-center mt-5">Twitter</h1>
      <div className="d-flex flex-column align-items-start gap-3 mt-5">
        <Link to="/" className="text-white d-flex align-items-center gap-3 fs-4">
          <i className="bi bi-house-door"></i> Accueil
        </Link>
        <Link to="/" className="text-white d-flex align-items-center gap-3 fs-4">
          <i className="bi bi-envelope"></i> Messages
        </Link>
        <Link to={`/user/${username}`} className="text-white d-flex align-items-center gap-3 fs-4">
          <i className="bi bi-person"></i> Profil
        </Link>
        {token && (
          <button
            className="btn bg-white text-black rounded-pill d-flex align-items-center gap-3 fs-4 mt-3"
            onClick={logout}
          >
            <i className="bi bi-box-arrow-right"></i> Déconnexion
          </button>
        )}
      </div>
    </div>
  );
}

export default HomeSection;