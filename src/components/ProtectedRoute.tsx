import { ReactNode } from "react";
import { Navigate } from "react-router-dom";

type TProtectedRouteProps = {
    isAuthenticated: boolean;
    children: ReactNode
}

const ProtectedRoute: React.FC<TProtectedRouteProps> = ({ isAuthenticated, children }) => {
    return !isAuthenticated ? <Navigate to="/" replace /> : children
}

export default ProtectedRoute;
