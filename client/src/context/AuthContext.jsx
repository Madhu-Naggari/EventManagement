import { createContext, useContext, useState, useEffect } from "react";
import Cookies from "js-cookie";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = Cookies.get("token");
    const userData = Cookies.get("user");

    if (token && userData) {
      try {
        setUser(JSON.parse(userData));
      } catch (error) {
        console.error("Failed to parse user data:", error);
      }
    }
    setLoading(false);
  }, []);
  const isSecure = window.location.protocol === "https:";
  const login = (userData, token) => {
    setUser(userData);

    Cookies.set("token", token, {
      expires: 7,
      secure: isSecure,
      sameSite: "lax",
    });
    Cookies.set("user", JSON.stringify(userData), {
      expires: 7,
      secure: isSecure,
      sameSite: "lax",
    });
  };

  const logout = () => {
    setUser(null);
    Cookies.remove("token");
    Cookies.remove("user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
