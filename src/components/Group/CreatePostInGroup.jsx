import styles from "../Home/CreatePost/CreatePost.module.css";
import { useAuth } from "../../hooks/useAuthContext";
import PropTypes from "prop-types";
import useDialog from "../../hooks/useDialog";
import CreatePostInGroupModal from "./CreatePostInGroupModal";

export default function CreatePostInGroup({ handlePostCreated }) {
  const { user } = useAuth();
  const { dialogRef, closeDialog, showDialog } = useDialog();

  return (
    <div className={styles.container}>
      <CreatePostInGroupModal
        ref={dialogRef}
        closeDialog={closeDialog}
        handlePostCreated={handlePostCreated}
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

CreatePostInGroup.propTypes = {
  handlePostCreated: PropTypes.func,
};
