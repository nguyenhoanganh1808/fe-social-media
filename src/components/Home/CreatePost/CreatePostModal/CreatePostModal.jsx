import { forwardRef } from "react";
import styles from "./CreatePostModal.module.css";
import PropTypes from "prop-types";
import { Smile, Image, File, Link } from "lucide-react";

const CreatePostModal = forwardRef(function CreatePostModal({ author }, ref) {
  return (
    <dialog className={styles.wrapper} ref={ref}>
      <h1>Create Post</h1>
      <hr />
      <div>
        <img className={styles.avatar} src={author.avatarUrl} alt="" />
        <div>
          <p>{author.link}</p>
          <p>{author.name}</p>
        </div>
      </div>

      <textarea name="" id=""></textarea>
      <Smile />
      <div>
        <p>Add to your post</p>
        <div>
          <Image />
          <File />
          <Link />
        </div>
      </div>
      <button>Post</button>
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
