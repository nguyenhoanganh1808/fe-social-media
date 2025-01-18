import { Outlet } from "react-router-dom";
import Sidebar from "../../components/Edu/Sidebar/Sidebar";
import styles from "./EduPage.module.css";
import IdentityConfirmModal from "../../components/Edu/IdentityConfirmModal";
import useToggle from "../../hooks/useToggle";
import { useState } from "react";
import { getCookie } from "../../lib/utils";

export default function EduPage() {
  const { isOpen, close } = useToggle(true);
  const [isAuthen, setIsAuthen] = useState(getCookie("eduAuthToken") !== null);

  if (!isAuthen) {
    return (
      <div
        className={"flex w-screen  items-center justify-center "}
        style={{
          height: `calc(100vh - 80px)`,
          background: "linear-gradient(#84cbf3, #ffffff)",
        }}
      >
        <IdentityConfirmModal
          openModal={isOpen}
          onCloseModal={close}
          setIsAuthen={setIsAuthen}
        />
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <Sidebar />
      <Outlet />
    </div>
  );
}
