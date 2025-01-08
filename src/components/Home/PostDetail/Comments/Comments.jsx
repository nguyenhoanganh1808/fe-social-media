import { useParams } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import CommentService from "../../../../services/comment.service";
import Comment from "./Comment/Comment";
import Spinner from "../../../common/Spinner/Spinner";
import PropTypes from "prop-types";
import EmptyState from "../../../common/EmptyState";

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
      if (cmts.data._embedded) {
        setComments([...comments, ...cmts.data._embedded.commentResponseList]);
      }
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

      {comments.length === 0 && !loading ? (
        <EmptyState
          svg={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-6 w-6"
            >
              <path d="M21 15c0 1.1-.9 2-2 2H5c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2h14c1.1 0 2 .9 2 2v9z"></path>
              <path d="M7 10h10"></path>
            </svg>
          }
          title="comment"
        />
      ) : (
        comments.map((comment, index) => (
          <Comment
            key={index}
            comments={comments}
            setComments={setComments}
            {...comment}
          />
        ))
      )}
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
