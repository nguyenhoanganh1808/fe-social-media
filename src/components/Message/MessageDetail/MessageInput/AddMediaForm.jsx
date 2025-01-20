import { Modal } from "flowbite-react";
import PropTypes from "prop-types";
import LoadingButton from "../../../common/Spinner/LoadingButton";
import Gallery from "./Gallery";
import { useFormContext } from "react-hook-form";
import { useAuth } from "../../../../hooks/useAuthContext";
import { MessageService } from "../../../../services/message.service";
import FileList from "./FileList";
import { useState } from "react";
import { useParams } from "react-router-dom";

export default function AddMediaForm({
  isOpenModal,
  mediaFiles,
  type,
  closeModal,
  setMessageData,
  receiverId,
}) {
  const { register, handleSubmit, setValue } = useFormContext();
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const { id, chatType } = useParams();
  console.log("chatType: ", chatType);
  const onSubmit = async (data) => {
    setLoading(true);
    const pendingMessage = {
      id: `pending-${Date.now()}`,
      content: data.caption,
      createdAt: new Date(),
      senderId: { id: user.userId, nickName: user.nickName },
      state: "pending",
      mediaFiles: mediaFiles,
    };
    if (chatType && chatType === "group-chat") {
      await MessageService.sendMessageWithMediaFileToGroup(id, data);
    } else {
      await MessageService.sendMessageWithMediaFileToUser(receiverId, data);
    }
    // setMessageData((prevMessages) => [pendingMessage, ...prevMessages]);

    setMessageData((prevMessages) =>
      prevMessages.filter((msg) => msg.id !== pendingMessage.id)
    );
    setValue("caption", "");

    closeModal();
    setLoading(false);
  };

  return (
    <>
      <Modal
        size={type === "media" ? undefined : "xl"}
        dismissible
        show={isOpenModal}
        onClose={closeModal}
      >
        <Modal.Header>
          {type === "media" ? "Send Photo" : "Send Document"}
        </Modal.Header>
        <Modal.Body>
          <div className="space-y-6 w-full">
            {type === "media" ? (
              <Gallery medias={mediaFiles} />
            ) : (
              <FileList files={mediaFiles} />
            )}
          </div>
        </Modal.Body>
        <Modal.Footer onClick={(e) => e.preventDefault()}>
          <input
            {...register("caption")}
            type="text"
            id="caption"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Add a caption"
            required
          />
          <form
            onSubmit={(e) => {
              e.preventDefault(); // Prevent the default form submission behavior
              e.stopPropagation(); // Stop event propagation
              handleSubmit(onSubmit)(e); // Call your submit handler with the event
            }}
          >
            <LoadingButton
              disabled={loading}
              onClick={(e) => e.stopPropagation()}
              type="submit"
            >
              SEND
            </LoadingButton>
          </form>
        </Modal.Footer>
      </Modal>
    </>
  );
}

AddMediaForm.propTypes = {
  isOpenModal: PropTypes.bool.isRequired,
  mediaFiles: PropTypes.array.isRequired,
  type: PropTypes.string.isRequired,
  closeModal: PropTypes.func.isRequired,
  setMessageData: PropTypes.func.isRequired,
  receiverId: PropTypes.string.isRequired,
};
