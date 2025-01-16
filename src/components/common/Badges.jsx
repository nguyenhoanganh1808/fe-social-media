import PropTypes from "prop-types";

export default function Badges({ className = "", text }) {
  return (
    <span
      className={`bg-blue-100 text-blue-800 text-sm font-medium me-2 px-2.5 rounded dark:bg-blue-900 dark:text-blue-300 py-1 ${className}`}
    >
      {text}
    </span>
  );
}

Badges.propTypes = {
  className: PropTypes.string,
  text: PropTypes.string.isRequired,
};
