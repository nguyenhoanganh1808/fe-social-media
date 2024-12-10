import styles from "./CommentInput.module.css";
import PropTypes from "prop-types";

export default function CommentInput({ id, onClose }) {
  return (
    <div className={styles.inputContainer}>
      <textarea
        name={`comment-input-${id}`}
        id={`comment-input-${id}`}
      ></textarea>
      <div>
        
      </div>
    </div>
  );
}

CommentInput.propTypes = {
  onClose: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
};
