import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useAuthStore } from "./store/useAuthStore";
import AccessPage from "./AccessPage";
import Profile from "./Profile";
import ProtectedRoute from "./ProtectedRoute";
import './config/i18n';

type TStateProps = {
  isAuthenticated: boolean;
}

const App: React.FC = () => {
  const isAuthenticated = useAuthStore((state: TStateProps) => state.isAuthenticated);
  // TODO - error boundary
  // TODO - debounce the API call
  // TODO - Unit tests
  // TODO - add theme

  return (
    <Router>
        <Routes>
          <Route path="/" element={<AccessPage />} />
          <Route
            path="/profile"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<AccessPage />} />
        </Routes>
    </Router>
  );
};

export default App;
