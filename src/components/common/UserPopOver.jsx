import { Popover } from "flowbite-react";
import PropTypes from "prop-types";

export function UserPopOver({ children, user }) {
  return (
    <Popover
      trigger="hover"
      aria-labelledby="profile-popover"
      content={
        <div className="w-64 p-3">
          <div className="mb-2 flex items-center justify-between">
            <a href="#">
              <img
                className="h-10 w-10 rounded-full"
                src={user.avatarUrl}
                alt={user.nickname}
              />
            </a>
            <div>
              <button
                type="button"
                className="rounded-lg bg-blue-700 px-3 py-1.5 text-xs font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Follow
              </button>
            </div>
          </div>
          <p
            id="profile-popover"
            className="text-base font-semibold leading-none text-gray-900 dark:text-white"
          >
            <span>{user.nickname}</span>
          </p>
          <p className="mb-3 text-sm font-normal">
            <span className="hover:underline">@j{user.tagName}</span>
          </p>
          {/* <p className="mb-4 text-sm">
            Open-source contributor. Building{" "}
            <a
              href="#"
              className="text-blue-600 hover:underline dark:text-blue-500"
            >
              flowbite.com
            </a>
            .
          </p> */}
          <ul className="flex text-sm">
            <li className="me-2">
              <span className="hover:underline">
                <span className="font-semibold text-gray-900 dark:text-white">
                  799
                </span>
                <span> Following</span>
              </span>
            </li>
            <li>
              <span className="hover:underline">
                <span className="font-semibold text-gray-900 dark:text-white">
                  3,758
                </span>
                <span> Followers</span>
              </span>
            </li>
          </ul>
        </div>
      }
    >
      {children}
    </Popover>
  );
}

UserPopOver.propTypes = {
  children: PropTypes.node.isRequired,
  user: PropTypes.shape({
    avatarUrl: PropTypes.string.isRequired,
    nickname: PropTypes.string.isRequired,
    tagName: PropTypes.string.isRequired,
  }),
};
