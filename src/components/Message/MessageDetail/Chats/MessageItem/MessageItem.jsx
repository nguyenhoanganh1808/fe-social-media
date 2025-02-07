import PropTypes from "prop-types";
import { useAuth } from "../../../../../hooks/useAuthContext";
import { formatToTime } from "../../../../../lib/utils";
import ImagesGallery from "./ImagesGallery";
import FileView from "./FileView";
import { useParams } from "react-router-dom";
import { CHAT_BOT_AVATAR } from "../../../../../lib/constants";

export default function MessageItem({ messageData }) {
  const { user } = useAuth();
  const { id } = useParams();

  console.log("mess: ", messageData);
  let sender;
  let isAuthor;
  if (id === "chat-bot") {
    sender = messageData.isUser
      ? user
      : { avatarUrl: CHAT_BOT_AVATAR, nickName: "Chatbot" };
    isAuthor = sender.userId === user.userId;
  } else {
    sender = messageData.senderId.student
      ? messageData.senderId.student.profile
      : messageData.senderId.lecturer
      ? messageData.senderId.lecturer.profile
      : messageData.senderId;
    isAuthor = sender.userId === user.userId;
  }
  const mediaType = messageData.mediaFiles
    ? messageData.mediaFiles[0]?.type
    : "";

  if (isAuthor) {
    return (
      <div className="w-full flex justify-end pr-5">
        <div className="flex items-start gap-2.5">
          <div className="flex flex-col gap-1 w-full max-w-[320px]">
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                {formatToTime(messageData.createdAt)}
              </span>
            </div>
            <div className="flex flex-col leading-1.5 p-4 border-gray-200 bg-blue-200 rounded-s-xl rounded-se-xl dark:bg-gray-700">
              <p className="text-sm font-normal text-gray-900 dark:text-white">
                {messageData.content}
                {mediaType === "IMAGE" || mediaType === "VIDEO" ? (
                  <ImagesGallery medias={messageData.mediaFiles} />
                ) : (
                  <FileView
                    files={messageData.mediaFiles ? messageData.mediaFiles : []}
                  />
                )}
              </p>
            </div>
            <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
              {messageData.state === "pending" ? "Pending" : "Delivered"}
            </span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pl-3 flex items-start gap-2.5">
      <img
        className="w-8 h-8 rounded-full"
        src={sender.avatarUrl}
        alt="Jese image"
      />
      <div className="flex flex-col gap-1 w-full max-w-[320px]">
        <div className="flex items-center space-x-2 rtl:space-x-reverse">
          <span className="text-sm font-semibold text-gray-900 dark:text-white">
            {sender.nickName}
          </span>
          <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
            {formatToTime(messageData.createdAt)}
          </span>
        </div>
        <div className="flex flex-col leading-1.5 p-4 border-gray-200 bg-gray-100 rounded-e-xl rounded-es-xl dark:bg-gray-700">
          <p className="text-sm font-normal text-gray-900 dark:text-white">
            {messageData.content}
            {mediaType === "IMAGE" || mediaType === "VIDEO" ? (
              <ImagesGallery medias={messageData.mediaFiles} />
            ) : (
              <FileView files={messageData.mediaFiles || []} />
            )}
          </p>
        </div>
        <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
          Delivered
        </span>
      </div>
    </div>
  );
}

MessageItem.propTypes = {
  messageData: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    state: PropTypes.string,
    mediaFiles: PropTypes.arrayOf(
      PropTypes.shape({
        type: PropTypes.string.isRequired,
        url: PropTypes.string.isRequired,
      })
    ),
    senderId: PropTypes.shape({
      nickname: PropTypes.string.isRequired,
      avatarUrl: PropTypes.string.isRequired,
      student: PropTypes.object,
      lecturer: PropTypes.object,
    }),
    receiverId: PropTypes.shape({
      id: PropTypes.string.isRequired,
      nickname: PropTypes.string.isRequired,
      avatarUrl: PropTypes.string.isRequired,
    }),
    content: PropTypes.string,
    isUser: PropTypes.bool,
    createdAt: PropTypes.string,
  }),
};
