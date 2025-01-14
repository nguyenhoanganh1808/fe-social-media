import { Modal } from "flowbite-react";
import PropTypes from "prop-types";
import LoadingButton from "../common/Spinner/LoadingButton";
import { useForm } from "react-hook-form";
import { MessageService } from "../../services/message.service";
import { useState } from "react";

export function FirstMessageModal({ isOpen, closeModal, user }) {
  const { register, handleSubmit } = useForm();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);
    await MessageService.sendMessageToUser(user.userId, data);
    setLoading(false);
  };
  return (
    <>
      <Modal
        onClick={(e) => e.stopPropagation()}
        className="z-50"
        show={isOpen}
        onClose={closeModal}
      >
        <Modal.Header>Send your message</Modal.Header>
        <Modal.Body>
          <div className="space-y-6">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-6 mx-auto"
            >
              <label
                htmlFor="message"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Your message
              </label>
              <textarea
                {...register("message")}
                required
                id="message"
                rows="4"
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Leave a message..."
              ></textarea>
              <LoadingButton
                disabled={loading}
                isLoading={loading}
                type="submit"
              >
                SEND
              </LoadingButton>
            </form>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

FirstMessageModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
  user: PropTypes.shape({
    userId: PropTypes.string.isRequired,
  }),
};
