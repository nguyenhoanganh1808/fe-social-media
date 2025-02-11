import useToggle from "../../hooks/useToggle";
import NotificationItem from "./NotificationItem";
import useFetchNotifications from "../../hooks/useFetchNotifications";
import EmptyState from "../common/EmptyState";
import SpinningContainer from "../common/SpinningContainer";
import { Bell } from "lucide-react";

export default function NotificationsList() {
  const { isOpen, toggle, close } = useToggle();
  const { notifications, isFetchingMore, loading, notificationListRef } =
    useFetchNotifications();

  console.log("notifications", notificationListRef);

  return (
    <>
      <button
        id="dropdownNotificationButton"
        data-dropdown-toggle="dropdownNotification"
        className="pt-1 pr-5 relative inline-flex items-center text-sm font-medium text-center text-gray-500 hover:text-gray-900 focus:outline-none dark:hover:text-white dark:text-gray-400"
        type="button"
        onClick={toggle}
      >
        <Bell />

        <div className="absolute block w-3 h-3 bg-red-500 border-2 border-white rounded-full top-1 start-2.5 dark:border-gray-900"></div>
      </button>

      <div
        id="dropdownNotification"
        className={`"z-20 absolute w-full right-1 top-14 max-w-sm bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-800 dark:divide-gray-700" ${
          isOpen ? "block" : "hidden"
        }`}
        aria-labelledby="dropdownNotificationButton"
      >
        <div className="block px-4 py-2 font-medium text-center text-gray-700 rounded-t-lg bg-gray-50 dark:bg-gray-800 dark:text-white">
          Notifications
        </div>
        <div
          ref={notificationListRef}
          className="h-[500px] divide-y divide-gray-100 dark:divide-gray-700 overflow-y-scroll"
        >
          {loading ? (
            <SpinningContainer />
          ) : notifications.length > 0 ? (
            <ul>
              {notifications.map((notification) => (
                <NotificationItem
                  key={notification.id}
                  notificationData={notification}
                  onClose={close}
                />
              ))}
              {isFetchingMore && <SpinningContainer />}
            </ul>
          ) : (
            <EmptyState
              title="notifications"
              svg={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V4a2 2 0 10-4 0v1.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0a3 3 0 11-6 0h6z"
                  />
                </svg>
              }
            />
          )}
        </div>
        <a
          href="#"
          className="block py-2 text-sm font-medium text-center text-gray-900 rounded-b-lg bg-gray-50 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-white"
        >
          <div className="inline-flex items-center ">
            <svg
              className="w-4 h-4 me-2 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 14"
            >
              <path d="M10 0C4.612 0 0 5.336 0 7c0 1.742 3.546 7 10 7 6.454 0 10-5.258 10-7 0-1.664-4.612-7-10-7Zm0 10a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z" />
            </svg>
            View all
          </div>
        </a>
      </div>
    </>
  );
}
