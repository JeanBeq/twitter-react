function HomeSection() {
  return (
    <div>
        <h1 className="text-white text-center mt-5">Twitter</h1>
        <div className="d-flex flex-column align-items-start gap-3 mt-5">
          <a href="#" className="text-white d-flex align-items-center gap-3 fs-4">
            <i className="bi bi-house-door"></i> Accueil
          </a>
          <a href="#" className="text-white d-flex align-items-center gap-3 fs-4">
            <i className="bi bi-envelope"></i> Messages
          </a>
          <a href="#" className="text-white d-flex align-items-center gap-3 fs-4">
            <i className="bi bi-gear"></i> Paramètres
          </a>
        </div>
    </div>
  );
}

export default HomeSection;