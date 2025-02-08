import PropTypes from "prop-types";
import { useState } from "react";
import SpinningContainer from "../common/SpinningContainer";
import styles from "../Home/PostsList/PostsList.module.css";
import Post from "../Home/PostsList/Post/Post";
import EmptyState from "../common/EmptyState";

export default function PostsListPending({
  posts,
  loading,
  onApprove,
  onDeny,
}) {
  const [processing, setProcessing] = useState(null);

  const handleAction = async (postId, action) => {
    setProcessing(postId);
    await (action === "approve" ? onApprove(postId) : onDeny(postId));
    setProcessing(null);
  };

  return (
    <div className={styles.container}>
      <ul className={styles.postWrapper}>
        {posts && posts.length === 0 ? (
          <EmptyState svg={null} title="Posts" />
        ) : (
          posts?.map((post) => (
            <div
              className="bg-white shadow-md rounded-lg p-4 mb-4 flex flex-col gap-4"
              key={post.id}
            >
              <Post post={post} />
              <div className="flex gap-2">
                <button
                  className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:bg-gray-300"
                  onClick={() => handleAction(post.id, "approve")}
                  disabled={processing === post.id}
                >
                  {processing === post.id ? "Processing..." : "Approve"}
                </button>
                <button
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 disabled:bg-gray-300"
                  onClick={() => handleAction(post.id, "deny")}
                  disabled={processing === post.id}
                >
                  {processing === post.id ? "Processing..." : "Deny"}
                </button>
              </div>
            </div>
          ))
        )}
      </ul>
      {loading && <SpinningContainer />}
    </div>
  );
}

PostsListPending.propTypes = {
  loading: PropTypes.bool,
  posts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
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
  ).isRequired,
  onApprove: PropTypes.func.isRequired,
  onDeny: PropTypes.func.isRequired,
};
