import InteractionBar from "./InteractionBar/InteractionBar";
import styles from "./Post.module.css";
import PropTypes from "prop-types";

function Post({ post }) {
  return (
    <div className={styles.container}>
      <p className={styles.author}>{post.authorName}</p>
      <p>{post.content}</p>
      <ul>
        {post.images.map((image) => (
          <img className={styles.contentImage} key={image} src={image} alt="" />
        ))}
      </ul>
      <InteractionBar post={post} />
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
  }),
};

export default Post;
