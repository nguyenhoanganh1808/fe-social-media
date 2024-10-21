import { Home, Mail, Book, Bell } from "lucide-react";
import styles from "./Tab.module.css";

export default function Tab() {
  return (
    <div className={styles.container}>
      <Home color="black" size={30} fill="#DBEAEE" />
      <Mail color="black" size={30} fill="#DBEAEE" />
      <Book color="black" size={30} fill="#DBEAEE" />
      <Bell color="black" size={30} fill="#DBEAEE" />
    </div>
  );
}
