import { Modal, Label, Textarea } from "flowbite-react";
import PropTypes from "prop-types";
import LoadingButton from "../../../common/Spinner/LoadingButton";
import CancelButton from "../../../common/CancelButton";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { ReportService } from "../../../../services/report.service";

export function ReportModalForm({ isOpenModal, onCloseModal, postId }) {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      postId: postId,
    },
  });
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);
    const result = await ReportService.reportPost(data);
    if (result.success) {
      onCloseModal();
    }
    setLoading(false);
    console.log(data);
  };

  return (
    <>
      <Modal
        onClick={(e) => e.stopPropagation()}
        show={isOpenModal}
        onClose={onCloseModal}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <Modal.Header>Report this post</Modal.Header>
          <Modal.Body>
            <div className="w-full">
              <div className="mb-2 block">
                <Label htmlFor="comment" value="Your message" />
              </div>
              <input
                {...register("postId")}
                name="postId"
                type="text"
                value={postId}
                className="hidden"
              />
              <Textarea
                {...register("reason")}
                id="reason"
                name="reason"
                className="w-full"
                placeholder="Leave a comment..."
                required
                rows={4}
              />
            </div>
          </Modal.Body>
          <Modal.Footer>
            <div className="ml-auto">
              <CancelButton onClick={onCloseModal}>Cancel</CancelButton>
              <LoadingButton
                isLoading={loading}
                disabled={loading}
                type="submit"
              >
                Submit
              </LoadingButton>
            </div>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  );
}

ReportModalForm.propTypes = {
  isOpenModal: PropTypes.bool.isRequired,
  onCloseModal: PropTypes.func.isRequired,
  postId: PropTypes.number.isRequired,
};
