import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import styles from "./AuthPage.module.css";
import { Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../../contexts/auth/useAuthContext";

export default function AuthPage() {
  const location = useLocation();

  const isCreateProfileRoute = location.pathname === "/auth/create-profile";
  const { user } = useAuth();

  console.log("user: ", user);
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
