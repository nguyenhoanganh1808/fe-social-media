import { useEffect, useRef, useState } from "react";
import styles from "./CreatePost.module.css";
import CreatePostModal from "./CreatePostModal/CreatePostModal";
import { useAuth } from "../../../contexts/auth/useAuthContext";

export default function CreatePost() {
  const [modalOpen, setModalOpen] = useState(false);
  const dialogRef = useRef(null);
  const { user } = useAuth();

  function showDialog() {
    dialogRef.current?.showModal();
    setModalOpen(true);
  }

  function closeDialog() {
    dialogRef.current?.close();
    setModalOpen(false);
  }

  useEffect(() => {
    if (modalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [modalOpen]);

  return (
    <div className={styles.container}>
      <CreatePostModal closeDialog={closeDialog} ref={dialogRef} />
      <img className={styles.avatar} src={user.avatarUrl} alt="User avatar" />

      <div className={styles.postContainer}>
        <textarea
          onClick={showDialog}
          className={styles.postContent}
          name="content"
          id="content"
          placeholder="What happening?"
        ></textarea>
      </div>
    </div>
  );
}
