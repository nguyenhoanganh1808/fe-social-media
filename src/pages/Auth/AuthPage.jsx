import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import styles from "./AuthPage.module.css";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../../hooks/useAuthContext";

export default function AuthPage() {
  const location = useLocation();

  const isCreateProfileRoute = location.pathname === "/auth/create-profile";
  const { user } = useAuth();

  if (user) {
    return <Navigate to="/" replace />;
  }

  return (
    <>
      <main
        className={`${styles.container} ${
          !isCreateProfileRoute ? "" : styles.profileFormContainer
        }`}
      >
        <div className={!isCreateProfileRoute ? styles.signInWrapper : ""}>
          <Outlet />
        </div>
      </main>
      <ToastContainer />
    </>
  );
}
