import styles from "./Comment.module.css";
import PropTypes from "prop-types";
import { formatDistanceToNowStrict } from "date-fns";
import HeartButton from "../../../../Button/HeartButton/HeartButton";
import { MessageCircle } from "lucide-react";
import InteractionButton from "../../../../Button/InteractionButton/InteractionButton";
import useToggle from "../../../../../hooks/useToggle";
import CommentInput from "../CommentInput/CommentInput";
import CommentService from "../../../../../services/comment.service";
import { toast } from "react-toastify";

export default function Comment({
  createdAt,
  id,
  // mediaFiles,
  parentId,
  postId,
  replies,
  replyCount,
  textContent,
  user,
  comments,
  setComments,
}) {
  const formatCreatedAt = formatDistanceToNowStrict(createdAt) + " ago";
  const { isOpen, close, open } = useToggle();

  function addReplyToNestedComment(comments, replyId, newReply) {
    console.log("commentsadd: ", comments);
    return comments.map((comment) => {
      if (comment.id === replyId) {
        return {
          ...comment,
          replies: [...(comment.replies || []), newReply],
        };
      } else if (comment.replies && comment.replies.length > 0) {
        return {
          ...comment,
          replies: addReplyToNestedComment(comments.replies, replyId, newReply),
        };
      }
      return comment;
    });
  }

  async function handleViewMoreReply() {
    try {
      const reply = await CommentService.getReply(id);
      console.log("reply: ", reply);
      console.log("comments: ", comments);
      const newComments = addReplyToNestedComment(comments, id, reply);
      console.log("hehe");
      console.log("newComments: ", newComments);

      setComments(newComments);
    } catch (e) {
      console.log(e);
      toast(e || "Failed to fetch reply");
    }
  }

  return (
    <div className={styles.comment}>
      <div className={styles.commentHeader}>
        <img
          src={user.avatarUrl}
          alt={`${name}'s avatar`}
          className={styles.avatar}
        />
        <div>
          <strong>{user.nickname}</strong>
          <span className={styles.timestamp}>{formatCreatedAt}</span>
          <p className={styles.content}>{textContent}</p>
        </div>
      </div>
      <div className={styles.interactionContainer}>
        <InteractionButton icon={<HeartButton />} count={1000} />
        <div onClick={open}>
          <MessageCircle size={23} />
          <p>Reply</p>
        </div>
      </div>
      {replyCount > 0 && parentId && (
        <button
          onClick={handleViewMoreReply}
          className="bg-none p-0 border-none hover:text-gray-600 font-semibold"
        >
          {`View all ${replyCount} reply`}
        </button>
      )}
      {isOpen && (
        <CommentInput
          onClose={close}
          postId={postId}
          parentId={id}
          setComments={setComments}
        />
      )}
      {replies && replies.length > 0 && (
        <div className={styles.replies}>
          {replies.map((reply, index) => (
            <Comment key={index} {...reply} />
          ))}
        </div>
      )}
    </div>
  );
}

Comment.propTypes = {
  createdAt: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  mediaFiles: PropTypes.array,
  parentId: PropTypes.oneOfType([PropTypes.string, PropTypes.any]),
  postId: PropTypes.number,
  replies: PropTypes.array,
  textContent: PropTypes.string.isRequired,
  user: PropTypes.shape({
    nickname: PropTypes.string.isRequired,
    avatarUrl: PropTypes.string.isRequired,
  }),
  setComments: PropTypes.func.isRequired,
  replyCount: PropTypes.number,
  comments: PropTypes.array.isRequired,
};
