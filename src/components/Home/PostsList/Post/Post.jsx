import InteractionBar from "./InteractionBar/InteractionBar";
import styles from "./Post.module.css";
import PropTypes from "prop-types";
import { formatDistanceToNowStrict } from "date-fns";
import InteractionButton from "../../../Button/InteractionButton/InteractionButton";
import { Bookmark } from "lucide-react";

function Post({ post }) {
  const distanceFromNow = formatDistanceToNowStrict(post.postTime);
  return (
    <div className={styles.container}>
      <div className={styles.authorAndTime}>
        <p className={styles.author}>{post.authorName}</p>
        <p className={styles.time}>{distanceFromNow} ago</p>
      </div>
      <p>{post.content}</p>
      <ul>
        {post.images.map((image) => (
          <img className={styles.contentImage} key={image} src={image} alt="" />
        ))}
      </ul>
      <div className={styles.interactionContainer}>
        <InteractionBar post={post} />
        <InteractionButton count={null} icon={<Bookmark />} />
      </div>
    </div>
  );
}

Post.propTypes = {
  post: PropTypes.shape({
    authorName: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    images: PropTypes.arrayOf(PropTypes.string).isRequired,
    likeCount: PropTypes.number.isRequired,
    commentCount: PropTypes.number.isRequired,
    postTime: PropTypes.instanceOf(Date).isRequired,
  }),
};

export default Post;
