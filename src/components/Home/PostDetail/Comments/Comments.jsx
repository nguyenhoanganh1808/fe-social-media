import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import CommentService from "../../../../services/comment.service";
import Comment from "./Comment/Comment";
import Spinner from "../../../common/Spinner/Spinner";
import PropTypes from "prop-types";

export default function Comments({ comments, setComments }) {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      const cmts = await CommentService.getComments(id, 0, 100, true);

      if (cmts._embedded) {
        setComments(cmts._embedded.commentResponseList);
      }
      setLoading(false);
    };
    fetch();
  }, [id, setComments]);

  return (
    <div>
      <h2 className="">
        <strong>Comments</strong>
      </h2>
      <hr />
      {loading ? (
        <div className="w-full justify-center flex">
          <Spinner />
        </div>
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
