import styles from "./CreatePost.module.css";

export default function CreatePost() {
  return (
    <div className={styles.container}>
      <img
        className={styles.avatar}
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStqtktl3g6wWkAzvUAi32yzYgb-jZ0-Pn0sQ&s"
        alt=""
      />

      <div className={styles.postContainer}>
        <textarea
          className={styles.postContent}
          name="content"
          id="content"
          placeholder="What happening?"
        ></textarea>
      </div>
    </div>
  );
}
