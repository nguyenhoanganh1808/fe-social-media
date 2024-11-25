import styles from "./Header.module.css";
import Tab from "./Tab/Tab";
import { Link } from "react-router-dom";
import FlyOutMenu from "../FlyOutMenu/FlyOutMenu";

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.leftContainer}>
        <Link to={`/`}>
          <img src="/images/logo-uit.svg" alt="UIT logo" />
        </Link>
        <input type="search" placeholder="# Explore" />
      </div>

      <div className={styles.rightContainer}>
        <Tab />
        <hr className={styles.hr} />
        <FlyOutMenu />
      </div>
    </header>
  );
}
