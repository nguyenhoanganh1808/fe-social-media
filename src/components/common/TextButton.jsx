import PropTypes from "prop-types";
import Spinner from "../common/Spinner/Spinner";

export default function TextButton({ children, onClick, loading }) {
  return (
    <button
      onClick={onClick}
      disabled={loading}
      type="button"
      className="py-2.5 px-5 me-2 mb-2 text-base font-medium text-blue-700 focus:outline-none  hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
    >
      <div className="flex gap-3">
        {children}
        {loading && <Spinner borderWidth={2} size={20} />}
      </div>
    </button>
  );
}

TextButton.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired,
  loading: PropTypes.bool,
};
