import styles from "./Header.module.css";
import Tab from "./Tab/Tab";
import { Link } from "react-router-dom";
import FlyOutMenu from "../FlyOutMenu/FlyOutMenu";

import NotificationsList from "./NotificationsList";
import Search from "./Search";

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.leftContainer}>
        <Link className="w-12 h-12" to={`/`}>
          <img src="/images/logo-uit.svg" alt="UIT logo" />
        </Link>
        <div className="lg:block hidden">
          <Search />
        </div>
      </div>

      <div className={styles.rightContainer}>
        <Tab />
        <div>
          <hr className={styles.hr} />
          <NotificationsList />
          <FlyOutMenu />
        </div>
      </div>
    </header>
  );
}
