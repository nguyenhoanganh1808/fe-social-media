import useFormCreateComment from "../../../../../hooks/useFormCreateComment";
import CommentService from "../../../../../services/comment.service";
import Spinner from "../../../../common/Spinner/Spinner";
import styles from "./CommentInput.module.css";
import PropTypes from "prop-types";

export default function CommentInput({
  parentId,
  postId,
  onClose,
  setComments,
}) {
  const {
    handleSubmit,
    onSubmit,
    errors,
    register,
    validationRules,
    loading,
    setLoading,
  } = useFormCreateComment();

  return (
    <div className="flex flex-col w-full">
      <form
        onSubmit={handleSubmit(async (data) => {
          setLoading(true);
          await onSubmit(data, parentId, postId);
          const cmts = await CommentService.getComments(postId, 0, 100, true);
          setComments(cmts._embedded.commentResponseList);
          setLoading(false);
          onClose();
        })}
        className={styles.inputContainer}
      >
        <textarea
          {...register("commentinput", validationRules.commentinput)}
          required
          name={`commentinput`}
          id={`commentinput`}
        ></textarea>
        <div className={styles.buttonContainer}>
          <button type="button" onClick={onClose}>
            Cancel
          </button>
          <button type="submit">
            {loading ? <Spinner size={20} borderWidth={3} /> : "Comment"}
          </button>
        </div>
      </form>
      {errors.commentinput && (
        <span className="text-red-500 font-semibold">
          {errors.commentinput.message}
        </span>
      )}
    </div>
  );
}

CommentInput.propTypes = {
  onClose: PropTypes.func.isRequired,
  parentId: PropTypes.string,
  postId: PropTypes.string.isRequired,
  setComments: PropTypes.func.isRequired,
};
