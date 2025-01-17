import PropTypes from "prop-types";

export default function CancelButton({
  children,
  onClick,
  disabled = false,
  type = "button",
}) {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      type={type}
      className={`py-2.5 px-5 me-2 mb-2 text-sm font-medium rounded-lg focus:outline-none border focus:z-10 focus:ring-4 
        ${
          disabled
            ? "text-gray-400 bg-gray-200 border-gray-300 cursor-not-allowed dark:bg-gray-700 dark:text-gray-500 dark:border-gray-600"
            : "text-gray-900 bg-white border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
        }`}
    >
      {children}
    </button>
  );
}

CancelButton.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  type: PropTypes.string,
};
