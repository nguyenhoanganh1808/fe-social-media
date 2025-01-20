import { Ellipsis } from "lucide-react";
import useToggle from "../../../../hooks/useToggle";

import PropTypes from "prop-types";

export default function UserControlDropDown({ user, handleRemoveUser }) {
  const { isOpen, toggle } = useToggle();

  return (
    <div className="relative">
      <button
        onClick={toggle}
        className="text-blue-500 hover:text-blue-700 text-sm font-medium"
      >
        <Ellipsis />
      </button>
      {isOpen && (
        <div
          id="dropdown"
          className="z-10 absolute -right-10 top-6 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
        >
          <ul
            className="py-2 text-sm text-gray-700 dark:text-gray-200"
            aria-labelledby="dropdownDefaultButton"
          >
            <li onClick={() => handleRemoveUser(user.userId)}>
              <a
                href="#"
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                Remove
              </a>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}

UserControlDropDown.propTypes = {
  handleRemoveUser: PropTypes.func.isRequired,
  user: PropTypes.object,
};
