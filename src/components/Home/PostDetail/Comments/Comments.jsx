import { useParams } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import CommentService from "../../../../services/comment.service";
import Comment from "./Comment/Comment";
import Spinner from "../../../common/Spinner/Spinner";
import PropTypes from "prop-types";

export default function Comments({ comments, setComments }) {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);

  const loadComments = useCallback(async () => {
    if (loading || !hasMore) return;
    setLoading(true);
    const limit = 10;
    const cmts = await CommentService.getComments(id, page, limit, true);

    if (cmts.success) {
      setComments([...comments, ...cmts.data._embedded.commentResponseList]);
      setPage(page + 1);
      setHasMore(cmts.data.page.number + 1 < cmts.data.page.totalPages);
    }
    setLoading(false);
  }, [id, page, loading, hasMore, comments, setComments]);

  useEffect(() => {
    loadComments();
  }, [loadComments]);

  return (
    <div>
      <h2 className="">
        <strong>Comments</strong>
      </h2>
      <hr />

      {comments.map((comment, index) => (
        <Comment
          key={index}
          comments={comments}
          setComments={setComments}
          {...comment}
        />
      ))}
      <div className="flex justify-center">{loading && <Spinner />}</div>
      {!loading && hasMore && (
        <button onClick={loadComments}>Load more comments</button>
      )}
    </div>
  );
}

Comments.propTypes = {
  comments: PropTypes.arrayOf(
    PropTypes.shape({
      createdAt: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
      mediaFiles: PropTypes.array,
      parentId: PropTypes.oneOfType([PropTypes.string, PropTypes.any]),
      postId: PropTypes.string,
      replies: PropTypes.array,
      textContent: PropTypes.string.isRequired,
    })
  ).isRequired,
  setComments: PropTypes.func.isRequired,
};
