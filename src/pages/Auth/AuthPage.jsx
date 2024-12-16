import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import styles from "./AuthPage.module.css";
import { Outlet } from "react-router-dom";

export default function AuthPage() {
  return (
    <>
      <main className={styles.container}>
        <div className={styles.signInWrapper}>
          <Outlet />
        </div>
      </main>
      <ToastContainer />
    </>
  );
}
