import styles from "./PostsList.module.css";
import Post from "./Post/Post";
import PropTypes from "prop-types";
import SpinningContainer from "../../common/SpinningContainer";

export default function PostsList({
  posts,
  loading,
  handlePostDeleted,
  handlePostUpdated,
}) {
  return (
    <div className={styles.container}>
      <ul className={styles.postWrapper}>
        {posts.map((post) => (
          <div className={styles.postContainer} key={post.id}>
            <Post
              post={post}
              handlePostDeleted={handlePostDeleted}
              handlePostUpdated={handlePostUpdated}
            />
          </div>
        ))}
      </ul>
      {loading && <SpinningContainer />}
    </div>
  );
}

PostsList.propTypes = {
  loading: PropTypes.bool,
  handlePostUpdated: PropTypes.func,
  posts: PropTypes.arrayOf(
    PropTypes.shape({
      textContent: PropTypes.string,
      title: PropTypes.string,
      user: PropTypes.shape({
        id: PropTypes.string.isRequired,
        username: PropTypes.string,
      }),
      mediaFiles: PropTypes.array,
      createdAt: PropTypes.string,
      isSaved: PropTypes.bool,
    })
  ),
  handlePostDeleted: PropTypes.func,
};
