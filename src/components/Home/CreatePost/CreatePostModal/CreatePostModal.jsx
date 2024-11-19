import { forwardRef, useState } from "react";
import styles from "./CreatePostModal.module.css";
import PropTypes from "prop-types";
import { Smile, ImagesIcon, FilesIcon, Link, X } from "lucide-react";
import AddImageOrVideoInput from "./AddImageOrVideo/AddImageOrVideoInput";
import AddLinks from "./AddLinks/AddLinks";
import useToggle from "../../../../hooks/useToggle";

const CreatePostModal = forwardRef(function CreatePostModal(
  { closeDialog, author },
  ref
) {
  const [postContent, setPostContent] = useState("");

  const {
    isOpen: addImageFormVisible,
    close: closeAddImageForm,
    toggle: toggleAddImageForm,
  } = useToggle();
  const { isOpen: addLinkFormVisible, toggle: toggleAddLinkForm } = useToggle();

  return (
    <dialog className={styles.wrapper} ref={ref}>
      <div className={styles.header}>
        <h1>Create Post</h1>
        <X
          onClick={closeDialog}
          className={styles.closeBtn}
          size={40}
          color="#ccc"
        />
      </div>
      <hr />

      <div className={styles.contentContainer}>
        <div className={styles.avatarContainer}>
          <img className={styles.avatar} src={author.avatarUrl} alt="" />
          <div>
            <p className={styles.link}>@{author.link}</p>
            <p className={styles.name}>{author.name}</p>
          </div>
        </div>
        <textarea
          className={styles.contentInput}
          placeholder={`What's on your mind, ${author.name}`}
          name="content"
          id="content"
          value={postContent}
          onChange={(e) => setPostContent(e.target.value)}
          cols={35}
          rows={addImageFormVisible ? 1 : 5}
        ></textarea>
        <Smile className={styles.icon} color="#ccc" size={30} />
        {addImageFormVisible && (
          <AddImageOrVideoInput onClose={closeAddImageForm} />
        )}

        {addLinkFormVisible && <AddLinks />}
        <div className={styles.addToPost}>
          <p>Add to your post</p>
          <div className={styles.buttons}>
            <ImagesIcon onClick={toggleAddImageForm} color="green" size={40} />
            <FilesIcon color="blue" size={40} />
            <Link onClick={toggleAddLinkForm} color="red" size={40} />
          </div>
        </div>
        <button
          className={postContent !== "" ? styles.submitBtn : styles.btnDeactive}
        >
          Post
        </button>
      </div>
    </dialog>
  );
});

CreatePostModal.propTypes = {
  author: PropTypes.shape({
    avatarUrl: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }),
  closeDialog: PropTypes.func,
};

export default CreatePostModal;
