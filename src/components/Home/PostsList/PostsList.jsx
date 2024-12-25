import styles from "./PostsList.module.css";
import Post from "./Post/Post";
import PropTypes from "prop-types";
import Spinner from "../../common/Spinner/Spinner";

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
          <div className={styles.postContainer} key={post.userImg}>
            <Post
              key={post.title}
              post={post}
              handlePostDeleted={handlePostDeleted}
              handlePostUpdated={handlePostUpdated}
            />
          </div>
        ))}
      </ul>
      {loading && <Spinner />}
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
      user: {
        id: PropTypes.number,
        username: PropTypes.string,
      },
      mediaFiles: PropTypes.array,
      createdAt: PropTypes.string,
      isSaved: PropTypes.bool,
    })
  ),
  handlePostDeleted: PropTypes.func,
};
