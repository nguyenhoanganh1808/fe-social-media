import PropTypes from "prop-types";
import BlueDot from "../common/BlueDot";
import LoadingButton from "../common/Spinner/LoadingButton";
import CancelButton from "../common/CancelButton";

import { formatDistanceToNow } from "date-fns";
import { FollowService } from "../../services/follow.service";
import { useState } from "react";
import { NotificationService } from "../../services/notification.service";

export default function RequestFollowNotification({ notificationData }) {
  const formatTime = formatDistanceToNow(notificationData.createdAt);
  const [loading, setLoading] = useState(false);

  const handleAccept = async () => {
    setLoading(true);
    await Promise.all([
      FollowService.respondFollow(notificationData.id, "ACCEPTED"),
      NotificationService.markNotificationAsRead(notificationData.id),
    ]);

    setLoading(false);
  };

  const handleRefuse = async () => {
    setLoading(true);
    await Promise.all([
      FollowService.respondFollow(notificationData.id, "REJECTED"),
      NotificationService.markNotificationAsRead(notificationData.id),
    ]);
    setLoading(false);
  };

  const sender =
    notificationData.sender.student || notificationData.sender.lectuer;
  return (
    <div
      to={notificationData.actionUrl}
      className="flex px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700"
    >
      <div className="flex-shrink-0 relative">
        <img
          className="rounded-full w-11 h-11"
          src={sender.profile.avatarUrl}
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
            <path d="M6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Zm11-3h-2V5a1 1 0 0 0-2 0v2h-2a1 1 0 1 0 0 2h2v2a1 1 0 0 0 2 0V9h2a1 1 0 1 0 0-2Z" />
          </svg>
        </div>
      </div>
      <div className="w-full ps-3">
        <div className="text-gray-500 text-sm mb-1.5 dark:text-gray-400">
          {" "}
          {notificationData.message}
        </div>
        <div className="text-xs text-blue-600 dark:text-blue-500 mb-2">
          {formatTime} ago
        </div>
        {notificationData.type === "FOLLOW_REQUEST" &&
          !notificationData.isRead && (
            <div className="h-full w-full">
              <CancelButton onClick={handleRefuse} disabled={loading}>
                Refuse
              </CancelButton>
              <LoadingButton
                onClick={handleAccept}
                disabled={loading}
                type="button"
              >
                Accept
              </LoadingButton>
            </div>
          )}
      </div>
      {!notificationData.isRead && (
        <div className="self-center">
          <BlueDot />
        </div>
      )}
    </div>
  );
}

RequestFollowNotification.propTypes = {
  notificationData: PropTypes.shape({
    id: PropTypes.number.isRequired,
    isRead: PropTypes.bool.isRequired,
    actionUrl: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    sender: PropTypes.shape({
      avatarUrl: PropTypes.string.isRequired,
      student: PropTypes.object,
      lectuer: PropTypes.object,
    }).isRequired,
    message: PropTypes.string.isRequired,
  }).isRequired,
};
