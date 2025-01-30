import { AuthProvider } from "./context/AuthContext";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import HomePage from "./pages/HomePage";

const App = () => (
  <AuthProvider>
    <HomePage />
  </AuthProvider>
);

export default App;