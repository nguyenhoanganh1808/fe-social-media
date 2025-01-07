import PropTypes from "prop-types";
import { useAuth } from "../../../../../hooks/useAuthContext";
import { formatToTime } from "../../../../../lib/utils";

export default function MessageItem({ messageData }) {
  const { user } = useAuth();

  const sender = messageData.senderId;

  const isAuthor = sender.id === user.userId;

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
              </p>
            </div>
            <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
              Delivered
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
            {sender.nickname}
          </span>
          <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
            {formatToTime(messageData.createdAt)}
          </span>
        </div>
        <div className="flex flex-col leading-1.5 p-4 border-gray-200 bg-gray-100 rounded-e-xl rounded-es-xl dark:bg-gray-700">
          <p className="text-sm font-normal text-gray-900 dark:text-white">
            {messageData.content}
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
    id: PropTypes.number.isRequired,
    senderId: PropTypes.shape({
      id: PropTypes.string.isRequired,
      nickname: PropTypes.string.isRequired,
      avatarUrl: PropTypes.string.isRequired,
    }),
    receiverId: PropTypes.shape({
      id: PropTypes.string.isRequired,
      nickname: PropTypes.string.isRequired,
      avatarUrl: PropTypes.string.isRequired,
    }),
    content: PropTypes.string,
    createdAt: PropTypes.string,
  }),
};
