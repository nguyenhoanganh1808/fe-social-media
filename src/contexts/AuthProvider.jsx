import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import AuthContext from "../hooks/useAuthContext";
import { UserService } from "../services/user.service";
import { AuthService } from "../services/auth.service";
import LoadingPage from "../pages/LoadingPage";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      const result = await UserService.getProfile();
      if (result.success) {
        setUser(result.data);
      }

      setLoading(false);
    };

    fetchProfile();
  }, []);

  const login = (userData) => setUser(userData);
  const logout = () => {
    setUser(null);
    AuthService.logout();
  };

  if (loading) {
    return <LoadingPage />;
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
