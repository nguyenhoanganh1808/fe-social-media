import InteractionButton from "../../../../Button/InteractionButton/InteractionButton";
import styles from "./InteractionBar.module.css";
import PropTypes from "prop-types";
import { Share, MessageCircle } from "lucide-react";
import HeartButton from "../../../../Button/HeartButton/HeartButton";

function InteractionBar({ post }) {
  console.log("post: ", post);
  return (
    <div className={styles.container}>
      <InteractionButton icon={<HeartButton post={post} />} count={1000} />
      <InteractionButton icon={<MessageCircle size={20} />} count={1000} />
      <InteractionButton count={200} icon={<Share size={20} />} />
    </div>
  );
}

InteractionBar.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.number,
    authorImage: PropTypes.string.isRequired,
    authorName: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    images: PropTypes.arrayOf(PropTypes.string).isRequired,
    likeCount: PropTypes.number.isRequired,
    commentCount: PropTypes.number.isRequired,
    postTime: PropTypes.instanceOf(Date).isRequired,
  }),
};

export default InteractionBar;
