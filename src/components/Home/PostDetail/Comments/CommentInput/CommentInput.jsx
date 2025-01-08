import useFormCreateComment from "../../../../../hooks/useFormCreateComment";
import CommentService from "../../../../../services/comment.service";
import LoadingButton from "../../../../common/Spinner/LoadingButton";
import CancelButton from "../../../../common/CancelButton";
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
          setComments(cmts.data._embedded.commentResponseList);
          setLoading(false);
          onClose();
        })}
        className={styles.inputContainer}
      >
        <textarea
          className="border-transparent focus:border-transparent focus:ring-0"
          {...register("commentinput", validationRules.commentinput)}
          required
          name={`commentinput`}
          id={`commentinput`}
        ></textarea>
        <div className="ml-auto mt-3 flex items-start space-x-2">
          <CancelButton onClick={onClose}>Cancel</CancelButton>
          <LoadingButton isLoading={loading} type="submit">
            Comment
          </LoadingButton>
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
