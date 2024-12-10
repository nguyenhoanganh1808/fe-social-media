import InteractionBar from "./InteractionBar/InteractionBar";
import styles from "./Post.module.css";
import PropTypes from "prop-types";
import { formatDistanceToNowStrict } from "date-fns";
import InteractionButton from "../../../Button/InteractionButton/InteractionButton";
import { Bookmark } from "lucide-react";
import { Link } from "react-router-dom";
import Avatar from "../../../Avatar/Avatar";

function Post({ post }) {
  const distanceFromNow = formatDistanceToNowStrict(post.postTime);
  return (
    <div className={styles.wrapper}>
      <Avatar src={post.authorImage} size={40} />
      <div className={styles.container}>
        <Link className={styles.link} to={`/posts/1`}>
          <div className={styles.authorAndTime}>
            <p className={styles.author}>{post.authorName}</p>
            <p className={styles.time}>{distanceFromNow} ago</p>
          </div>
          <p>{post.content}</p>
          <ul>
            {post.images.map((image) => (
              <img
                className={styles.contentImage}
                key={image}
                src={image}
                alt=""
              />
            ))}
          </ul>
        </Link>
        <div className={styles.interactionContainer}>
          <InteractionBar post={post} />
          <InteractionButton count={null} icon={<Bookmark />} />
        </div>
      </div>
    </div>
  );
}

Post.propTypes = {
  post: PropTypes.shape({
    authorImage: PropTypes.string.isRequired,
    authorName: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    images: PropTypes.arrayOf(PropTypes.string).isRequired,
    likeCount: PropTypes.number.isRequired,
    commentCount: PropTypes.number.isRequired,
    postTime: PropTypes.instanceOf(Date).isRequired,
  }),
};

export default Post;
