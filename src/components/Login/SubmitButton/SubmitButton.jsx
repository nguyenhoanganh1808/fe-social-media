import PropTypes from "prop-types";
import styles from "./SubmitButton.module.css";

function SubmitButton({ children }) {
  return (
    <button type="submit" className={`${styles.submitBtn} p-2 rounded-md`}>
      {children}
    </button>
  );
}

SubmitButton.propTypes = {
  children: PropTypes.node,
};

export default SubmitButton;
