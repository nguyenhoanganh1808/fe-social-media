import styles from "./Comment.module.css";
import PropTypes from "prop-types";
import { formatDistanceToNowStrict } from "date-fns";
import HeartButton from "../../../../Button/HeartButton/HeartButton";
import { MessageCircle } from "lucide-react";
import InteractionBar from "../../../PostsList/Post/InteractionBar/InteractionBar";
import InteractionButton from "../../../../Button/InteractionButton/InteractionButton";
import { useState } from "react";
import useToggle from "../../../../../hooks/useToggle";
import CommentInput from "../CommentInput/CommentInput";

export default function Comment({
  userImg,
  name,
  createdAt,
  content,
  comments,
}) {
  const formatCreatedAt = formatDistanceToNowStrict(createdAt) + " ago";
  const { isOpen, close, open, toggle } = useToggle();
  return (
    <div className={styles.comment}>
      <div className={styles.commentHeader}>
        <img src={userImg} alt={`${name}'s avatar`} className={styles.avatar} />
        <div>
          <strong>{name}</strong>
          <span className={styles.timestamp}>{formatCreatedAt}</span>
        </div>
      </div>
      <p className={styles.content}>{content}</p>
      <div className={styles.interactionContainer}>
        <InteractionButton icon={<HeartButton />} count={1000} />
        <div onClick={open}>
          <MessageCircle size={23} />
          <p>Reply</p>
        </div>
      </div>
      {isOpen && <CommentInput/>}
      {comments.length > 0 && (
        <div className={styles.replies}>
          {comments.map((reply, index) => (
            <Comment key={index} {...reply} />
          ))}
        </div>
      )}
    </div>
  );
}

Comment.propTypes = {
  userImg: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  createdAt: PropTypes.instanceOf(Date).isRequired,
  content: PropTypes.string.isRequired,
  comments: PropTypes.string.isRequired,
};
