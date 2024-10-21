import styles from "./Header.module.css";
import Tab from "./Tab/Tab";
import Avatar from "./Avatar/Avatar";

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.leftContainer}>
        <div>
          <img src="/images/uit-logo.svg" alt="" />
        </div>
        <input type="search" placeholder="# Explore" />
      </div>

      <div className={styles.rightContainer}>
        <Tab />
        <hr className={styles.hr} />
        <Avatar />
      </div>
    </header>
  );
}
