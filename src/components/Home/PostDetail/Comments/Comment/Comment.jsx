import styles from "./Comment.module.css";
import PropTypes from "prop-types";
import { formatDistanceToNowStrict } from "date-fns";
import { MessageCircle } from "lucide-react";
import useToggle from "../../../../../hooks/useToggle";
import CommentInput from "../CommentInput/CommentInput";
import CommentService from "../../../../../services/comment.service";
import { useState } from "react";
import TextButton from "../../../../common/TextButton";

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
  const [loading, setLoading] = useState(false);
  const [viewReplyButton, setViewReplyButton] = useState(true);

  function addReplyToNestedComment(comments, replyId, newReply) {
    return comments.map((comment) => {
      if (comment.id === replyId) {
        return {
          ...comment,
          replies: [...(comment.replies?.flat() || []), ...newReply],
        };
      } else if (comment.replies && comment.replies.length > 0) {
        return {
          ...comment,
          replies: [
            ...addReplyToNestedComment(
              comment.replies.flat(),
              replyId,
              newReply
            ),
          ],
        };
      }
      return comment;
    });
  }

  async function handleViewMoreReply() {
    setLoading(true);
    const result = await CommentService.getReply(id);
    if (result.success) {
      const newComments = addReplyToNestedComment(comments, id, result.data);

      console.log("newComments: ", newComments);
      setComments(newComments);
      setViewReplyButton(false);
    }
    setLoading(false);
  }

  const author = user.student || user.lecturer;

  return (
    <div className={styles.comment}>
      <div className={styles.commentHeader}>
        <img
          src={author.profile.avatarUrl}
          alt={`${name}'s avatar`}
          className={styles.avatar}
        />
        <div>
          <strong>{author.profile.nickName}</strong>
          <span className={styles.timestamp}>{formatCreatedAt}</span>
          <p className={styles.content}>{textContent}</p>
        </div>
      </div>
      <div className={styles.interactionContainer}>
        {/* <InteractionButton
          icon={<HeartButton />}
          count={1000}
          onClick={() => {}}
        /> */}
        <div onClick={open}>
          <MessageCircle size={23} />
          <p>Reply</p>
        </div>
      </div>
      {replyCount > 0 && parentId && viewReplyButton && (
        <TextButton loading={loading} onClick={handleViewMoreReply}>
          {`View ${replyCount} reply`}
        </TextButton>
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
            <Comment
              comments={comments}
              setComments={setComments}
              key={index}
              {...reply}
            />
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
    lecturer: PropTypes.object,
    student: PropTypes.object,
  }),
  setComments: PropTypes.func.isRequired,
  replyCount: PropTypes.number,
  comments: PropTypes.array.isRequired,
};
