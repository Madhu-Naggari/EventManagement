import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import { toast } from "sonner";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <div className="loading-spinner">Loading...</div>;
  }

  if (!user) {
    toast.warning("credentials/login required to access!");
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default PrivateRoute;
