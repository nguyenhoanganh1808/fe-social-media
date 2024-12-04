import { useState } from "react";
import styles from "./HeartButton.module.css";

export default function HeartButton() {
  const [isLiked, setIsLiked] = useState(false);
  return (
    <div className={styles.likeButton}>
      <div className={styles.heartBg}>
        <div
          onClick={() => setIsLiked(!isLiked)}
          className={`${styles.heartIcon} ${isLiked ? styles.liked : ""}`}
        ></div>
      </div>
    </div>
  );
}
