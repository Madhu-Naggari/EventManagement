import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";

const PublicRoute = ({ children }) => {
  // 1. Check directly if the token exists in browser cookies
  const token = Cookies.get("token");

  // 2. If token exists, user is already logged in -> Force them to Home
  if (token) {
    return <Navigate to="/" replace />;
  }

  // 3. If no token, allow them to see the Login/Register page
  return children;
};

export default PublicRoute;
