import { useForm } from "react-hook-form";
import CommentService from "../services/comment.service";
import { toast } from "react-toastify";
import { useState } from "react";

export default function useFormCreateComment() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const [loading, setLoading] = useState(false);

  const validationRules = {
    commentinput: {
      required: "This field is required",
    },
  };

  const onSubmit = async (data, parentId, postId) => {
    console.log("parentId: ", parentId);
    try {
      if (!parentId) {
        await CommentService.createCommentOnPost(data, postId);
      } else {
        await CommentService.replyComment(data, parentId, postId);
      }
    } catch (e) {
      toast.error(e.message || "Something went wrong");
    }
  };

  function addReplyToNestedComment(comments, replyId, newReply) {
    return comments.map((comment) => {
      if (comment.id === replyId) {
        return {
          ...comment,
          replies: [...(comment.replies?.flat() || []), ...newReply],
        };
      } else if (comment.replies && comment.replies.length > 0) {
        return {
          ...comment,
          replies: [
            ...addReplyToNestedComment(
              comment.replies.flat(),
              replyId,
              newReply
            ),
          ],
        };
      }
      return comment;
    });
  }

  return {
    loading,
    setLoading,
    register,
    handleSubmit,
    errors,
    onSubmit,
    validationRules,
    addReplyToNestedComment,
  };
}
