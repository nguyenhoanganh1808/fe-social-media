import { Outlet } from "react-router-dom";
import styles from "./Root.module.css";
import Header from "../Header/Header";

export default function Root() {
  return (
    <div className={styles.wrapper}>
      <Header />
      <Outlet />
    </div>
  );
}
