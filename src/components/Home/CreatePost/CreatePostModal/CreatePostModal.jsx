import { forwardRef, useState } from "react";
import styles from "./CreatePostModal.module.css";
import PropTypes from "prop-types";
import { Smile, ImagesIcon, FilesIcon, Link, X } from "lucide-react";
import AddImageOrVideoInput from "./AddImageOrVideo/AddImageOrVideoInput";

const CreatePostModal = forwardRef(function CreatePostModal({ author }, ref) {
  const [postContent, setPostContent] = useState("");

  function handleCloseModal() {
    ref.current.close();
  }

  return (
    <dialog className={styles.wrapper} ref={ref}>
      <div className={styles.header}>
        <h1>Create Post</h1>
        <X
          onClick={handleCloseModal}
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
        <form action=""></form>
        <textarea
          className={styles.contentInput}
          placeholder={`What's on your mind, ${author.name}`}
          name="content"
          id="content"
          value={postContent}
          onChange={(e) => setPostContent(e.target.value)}
          cols={35}
          rows={5}
        ></textarea>
        <Smile className={styles.icon} color="#ccc" size={30} />
        <AddImageOrVideoInput />
        <div className={styles.addToPost}>
          <p>Add to your post</p>
          <div>
            <ImagesIcon color="green" size={30} />
            <FilesIcon color="blue" size={30} />
            <Link color="red" size={30} />
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
};

export default CreatePostModal;
