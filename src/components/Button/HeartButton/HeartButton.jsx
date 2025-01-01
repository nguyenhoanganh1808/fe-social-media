import { useState } from "react";
import styles from "./HeartButton.module.css";
import ReactionService from "../../../services/reaction.service";
import PropTypes from "prop-types";

export default function HeartButton({ post, defaultLike, setLikeCount }) {
  const [isLiked, setIsLiked] = useState(defaultLike);

  const handleReactPost = async () => {
    let result;
    if (!isLiked) {
      setIsLiked(true);
      setLikeCount((prev) => prev + 1);
      result = await ReactionService.reactPost(post.id);
      if (result.error) {
        setIsLiked(false);
        setLikeCount((prev) => prev - 1);
      }
    } else {
      setIsLiked(false);
      setLikeCount((prev) => prev - 1);

      result = await ReactionService.deleteReaction(post.id);
      if (result.error) {
        setIsLiked(true);
        setLikeCount((prev) => prev + 1);
      }
    }
  };
  return (
    <div className={styles.likeButton}>
      <div className={styles.heartBg}>
        <div
          onClick={handleReactPost}
          className={`${styles.heartIcon} ${isLiked ? styles.liked : ""}`}
        ></div>
      </div>
    </div>
  );
}

HeartButton.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.number,
    reactionCount: PropTypes.number.isRequired,
  }),
  defaultLike: PropTypes.bool.isRequired,
  setLikeCount: PropTypes.func.isRequired,
};
