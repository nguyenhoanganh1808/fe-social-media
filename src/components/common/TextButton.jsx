import PropTypes from "prop-types";

export default function TextButton({ children, onClick }) {
  return (
    <button
      onClick={onClick}
      type="button"
      className="py-2.5 px-5 me-2 mb-2 text-base font-medium text-blue-700 focus:outline-none  hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
    >
      {children}
    </button>
  );
}

TextButton.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired,
};
