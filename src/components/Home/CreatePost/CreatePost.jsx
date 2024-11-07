import { useRef } from "react";
import styles from "./CreatePost.module.css";
import CreatePostModal from "./CreatePostModal/CreatePostModal";

export default function CreatePost() {
  const dialogRef = useRef(null);

  function handleTextAreaClick() {
    dialogRef.current?.showModal();
  }

  return (
    <div className={styles.container}>
      <CreatePostModal ref={dialogRef} />
      <img
        className={styles.avatar}
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStqtktl3g6wWkAzvUAi32yzYgb-jZ0-Pn0sQ&s"
        alt=""
      />

      <div className={styles.postContainer}>
        <textarea
          onClick={handleTextAreaClick}
          className={styles.postContent}
          name="content"
          id="content"
          placeholder="What happening?"
        ></textarea>
      </div>
    </div>
  );
}
