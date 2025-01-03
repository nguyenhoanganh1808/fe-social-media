import styles from "./CreatePost.module.css";
import CreatePostModal from "./CreatePostModal/CreatePostModal";
import { useAuth } from "../../../hooks/useAuthContext";
import PropTypes from "prop-types";
import useDialog from "../../../hooks/useDialog";

export default function CreatePost({ toggleValidation, handlePostCreated }) {
  const { user } = useAuth();
  const { dialogRef, closeDialog, showDialog } = useDialog();

  return (
    <div className={styles.container}>
      <CreatePostModal
        toggleValidation={toggleValidation}
        closeDialog={closeDialog}
        handlePostCreated={handlePostCreated}
        ref={dialogRef}
      />
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

CreatePost.propTypes = {
  toggleValidation: PropTypes.func,
  handlePostCreated: PropTypes.func,
};
