import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuthContext";
import useToggle from "../../hooks/useToggle";

export default function FlyOutMenu() {
  const { logout } = useAuth();
  const { isOpen, toggle } = useToggle();
  const { user } = useAuth();
  const handleLogout = () => {
    logout();
  };
  return (
    <div className="relative">
      <img
        id="avatarButton"
        type="button"
        data-dropdown-toggle="userDropdown"
        data-dropdown-placement="bottom-start"
        className="w-10 h-10 rounded-full cursor-pointer"
        src={user.avatarUrl}
        alt="User dropdown"
        onClick={toggle}
      />

      {isOpen && (
        <div
          id="userDropdown"
          className="z-10 right-0 bg-white absolute divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600"
        >
          <div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
            <div>{user.nickName}</div>
            <div className="font-medium truncate">{user.contact.email}</div>
          </div>
          <ul
            className="py-2 text-sm text-gray-700 dark:text-gray-200"
            aria-labelledby="avatarButton"
          >
            <li>
              <Link
                to={`/profile/${user.id}`}
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                View your profile
              </Link>
            </li>
            <li>
              <a
                href="#"
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                Settings
              </a>
            </li>
          </ul>
          <div className="py-1">
            <a
              onClick={handleLogout}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
            >
              Sign out
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
