import { ChevronDown } from "lucide-react";
import styles from "./Avatar.module.css";

export default function Avatar() {
  return (
    <div className={styles.container}>
      <img
        className={styles.avatar}
        src="https://i.pinimg.com/originals/95/e3/e6/95e3e653a04c821bf686486134a39f73.jpg"
        alt="John fuking wickk"
      />
      <p>Yeremias Nj</p>
      <ChevronDown color="#DBEAEE" size={30} />
    </div>
  );
}
