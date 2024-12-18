import { Outlet } from "react-router-dom";
import Sidebar from "../../components/Edu/Sidebar/Sidebar";
import styles from "./EduPage.module.css";

export default function EduPage() {
  return (
    <div className={styles.container}>
      <Sidebar />
      <Outlet />
    </div>
  );
}
