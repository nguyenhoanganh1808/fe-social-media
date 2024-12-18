import styles from "./Sidebar.module.css";
import { SidebarData } from "./SidebarData";
import Item from "./Item/Item";

export default function Sidebar() {
  return (
    <nav className={styles.container}>
      <img className={styles.logo} src="/icons/edu/logo.png" alt="UIT Logo" />

      <ul className={styles.list}>
        {SidebarData.map((item) => (
          <Item key={item.title} data={item} />
        ))}
      </ul>
    </nav>
  );
}
