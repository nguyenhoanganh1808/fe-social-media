import InteractionButton from "../../../../Button/InteractionButton/InteractionButton";
import styles from "./InteractionBar.module.css";
import PropTypes from "prop-types";
import { Share, MessageCircleMoreIcon } from "lucide-react";
import HeartButton from "../../../../Button/HeartButton/HeartButton";

function InteractionBar({ post }) {
  return (
    <div className={styles.container}>
      <InteractionButton icon={<HeartButton />} count={post.likeCount} />
      <InteractionButton
        icon={<MessageCircleMoreIcon size={20} />}
        count={post.commentCount}
      />
      <InteractionButton count={200} icon={<Share size={20} />} />
    </div>
  );
}

InteractionBar.propTypes = {
  post: PropTypes.shape({
    authorName: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    images: PropTypes.arrayOf(PropTypes.string).isRequired,
    likeCount: PropTypes.number.isRequired,
    commentCount: PropTypes.number.isRequired,
  }),
};

export default InteractionBar;
