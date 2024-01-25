import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useAuthStore } from "./store/useAuthStore";
import AccessPage from "./pages/Access";
import Profile from "./pages/Profile";
import ProtectedRoute from "./components/ProtectedRoute";
import './config/i18n';
import useThemeStore from "./store/useThemeStore";

type TStateProps = {
  isAuthenticated: boolean;
}

const App: React.FC = () => {
  const isAuthenticated = useAuthStore((state: TStateProps) => state.isAuthenticated);
  const {isRtl} = useThemeStore()
  // TODO - error boundary
  // TODO - debounce the API call
  // TODO - Unit tests

  return (
    <div dir={isRtl ? 'rtl' : 'ltr'}>
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
    </div>
  );
};

export default App;
