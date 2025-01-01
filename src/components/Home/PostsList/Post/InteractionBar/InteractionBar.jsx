import InteractionButton from "../../../../Button/InteractionButton/InteractionButton";
import styles from "./InteractionBar.module.css";
import PropTypes from "prop-types";
import { Share, MessageCircle } from "lucide-react";
import HeartButton from "../../../../Button/HeartButton/HeartButton";
import { useState } from "react";

function InteractionBar({ post }) {
  const [likeCount, setLikeCount] = useState(post.reactionCount);

  return (
    <div className={styles.container}>
      <InteractionButton
        icon={
          <HeartButton
            post={post}
            defaultLike={post.reactionType === "LIKE"}
            setLikeCount={setLikeCount}
          />
        }
        count={likeCount}
      />
      <InteractionButton
        icon={<MessageCircle size={20} />}
        count={post.commentCount}
      />
      <InteractionButton count={200} icon={<Share size={20} />} />
    </div>
  );
}

InteractionBar.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.number,
    reactionType: PropTypes.string,
    reactionCount: PropTypes.number.isRequired,
    commentCount: PropTypes.number.isRequired,
  }),
};

export default InteractionBar;
