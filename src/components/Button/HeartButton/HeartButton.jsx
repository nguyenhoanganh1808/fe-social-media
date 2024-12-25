import { useState } from "react";
import styles from "./HeartButton.module.css";
import ReactionService from "../../../services/reaction.service";
import { toast } from "react-toastify";
import PropTypes from "prop-types";

export default function HeartButton({ post }) {
  const [isLiked, setIsLiked] = useState(
    post.reactionType === "LIKE" ? true : false
  );

  const handleReactPost = async () => {
    try {
      if (!isLiked) {
        setIsLiked(true);
        const response = await ReactionService.reactPost(post.id);
        if (!response.ok) setIsLiked(false);
      } else {
        setIsLiked(false);
        const response = await ReactionService.deleteReaction(post.id);
        console.log("delete rection response: ", response);
        // if (!response.ok) setIsLiked(true);
      }
    } catch (e) {
      toast.error(e.message || "Failed to react to post");
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
    reactionType: PropTypes.string,
  }),
};
