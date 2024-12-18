import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import { useAuth } from "../../contexts/AuthContext";

const PrivateRoute = ({ children }) => {
  const { user } = useAuth();

  return user ? children : <Navigate to="/auth/login" replace />;
};

PrivateRoute.propTypes = {
  children: PropTypes.node,
};

export default PrivateRoute;
