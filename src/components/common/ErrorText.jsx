import PropTypes from "prop-types";

export default function ErrorText({ text }) {
  return (
    <p className="mt-2 text-sm text-red-600 dark:text-red-500">
      <span className="font-medium">{text}</span>
    </p>
  );
}

ErrorText.propTypes = {
  text: PropTypes.string,
};
