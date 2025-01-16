import { useNavigate, useParams } from "react-router-dom";
import Avatar from "../../Avatar/Avatar";
import Post from "../PostsList/Post/Post";
import Comments from "./Comments/Comments";
import styles from "./PostDetail.module.css";
import { useEffect, useState } from "react";
import { PostService } from "../../../services/post.service";
import SpinningContainer from "../../common/SpinningContainer";
import useToggle from "../../../hooks/useToggle";
import CommentInput from "./Comments/CommentInput/CommentInput";
import { useAuth } from "../../../hooks/useAuthContext";

export default function PostDetail() {
  const [postDetail, setPostDetail] = useState(null);
  const { user } = useAuth();
  const { isOpen, open, close } = useToggle();
  const { id } = useParams();
  const [comments, setComments] = useState([]);
  const navigate = useNavigate();

  const handlePostUpdated = async (postId, newContent) => {
    const result = await PostService.updatePost(postId, newContent);
    console.log("newContent: ", newContent);
    if (result.success) {
      setPostDetail(result.data);
    }

    return result;
  };

  const handlePostDeleted = async (postId) => {
    const result = await PostService.deletePost(postId);
    if (result.success) {
      navigate("/posts");
    }
  };

  useEffect(() => {
    async function fetchPost() {
      const { body } = await PostService.getPostById(id);
      setPostDetail(body);
    }
    fetchPost();
  }, [id]);

  if (!postDetail) {
    return <SpinningContainer />;
  }

  return (
    <div className={styles.container}>
      <Post
        post={postDetail}
        handlePostUpdated={handlePostUpdated}
        handlePostDeleted={handlePostDeleted}
      />
      <hr />
      <div className={styles.commentContainer}>
        <Avatar src={user.avatarUrl} size={40} />
        {isOpen ? (
          <CommentInput
            postId={id}
            parentId={null}
            onClose={close}
            setComments={setComments}
          />
        ) : (
          <input
            onClick={open}
            className={styles.commentInput}
            placeholder="Write your comment.."
            type="text"
          />
        )}
      </div>
      <Comments comments={comments} setComments={setComments} />
    </div>
  );
}
