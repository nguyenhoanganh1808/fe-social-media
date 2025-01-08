import { formatDistanceToNow } from "date-fns";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { NotificationService } from "../../services/notification.service";
import BlueDot from "../common/BlueDot";

export default function NotificationItem({ notificationData }) {
  const formatTime = formatDistanceToNow(notificationData.createdAt);

  const handleReadNotification = async () => {
    await NotificationService.markNotificationAsRead(notificationData.id);
  };

  return (
    <Link
      onClick={handleReadNotification}
      to={notificationData.actionUrl}
      className="flex px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700"
    >
      <div className="flex-shrink-0 relative">
        <img
          className="rounded-full w-11 h-11"
          src={notificationData.sender.avatarUrl}
          alt="Leslie image"
        />
        <div className="absolute flex items-center justify-center w-5 h-5 ms-6 -mt-5 bg-green-400 border border-white rounded-full dark:border-gray-800">
          <svg
            className="w-2 h-2 text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 18"
          >
            <path d="M18 0H2a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h2v4a1 1 0 0 0 1.707.707L10.414 13H18a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5 4h2a1 1 0 1 1 0 2h-2a1 1 0 1 1 0-2ZM5 4h5a1 1 0 1 1 0 2H5a1 1 0 0 1 0-2Zm2 5H5a1 1 0 0 1 0-2h2a1 1 0 0 1 0 2Zm9 0h-6a1 1 0 0 1 0-2h6a1 1 0 1 1 0 2Z" />
          </svg>
        </div>
      </div>
      <div className="w-full ps-3">
        <div className="text-gray-500 text-sm mb-1.5 dark:text-gray-400">
          {" "}
          {notificationData.message}. What do you say to{" "}
          <span className="font-semibold text-gray-900 dark:text-white">
            {notificationData.sender.nickname}
          </span>
        </div>
        <div className="text-xs text-blue-600 dark:text-blue-500">
          {formatTime} ago
        </div>
      </div>
      {!notificationData.isRead && (
        <div className="self-center">
          <BlueDot />
        </div>
      )}
    </Link>
  );
}

NotificationItem.propTypes = {
  notificationData: PropTypes.shape({
    id: PropTypes.string.isRequired,
    isRead: PropTypes.bool.isRequired,
    actionUrl: PropTypes.string.isRequired,
    createdAt: PropTypes.instanceOf(Date).isRequired,
    sender: PropTypes.shape({
      nickname: PropTypes.string.isRequired,
      avatarUrl: PropTypes.string.isRequired,
    }).isRequired,
    message: PropTypes.string.isRequired,
  }).isRequired,
};
