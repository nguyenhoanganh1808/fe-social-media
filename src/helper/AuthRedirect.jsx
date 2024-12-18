import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import { useAuth } from "../contexts/auth/useAuthContext";

const AuthRedirect = ({ children }) => {
  const { user } = useAuth();

  return user ? <Navigate to="/posts" replace /> : children;
};

AuthRedirect.propTypes = {
  children: PropTypes.node,
};

export default AuthRedirect;
