import { AuthProvider } from "./context/AuthContext";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import HomePage from "./pages/HomePage";
import NotificationsManager from "./components/NotificationsManager";

const App = () => (
  <AuthProvider>
    <HomePage />
    <NotificationsManager />
  </AuthProvider>
);

export default App;