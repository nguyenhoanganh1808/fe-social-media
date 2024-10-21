import PropTypes from "prop-types";
import styles from "./SubmitButton.module.css";
import { useNavigate } from "react-router-dom";

function SubmitButton({ children }) {
  const navigate = useNavigate(); // Initialize the navigate function

  return (
    <button
      onClick={() => {
        return navigate("/home");
      }}
      type="submit"
      className={styles.submitBtn}
    >
      {children}
    </button>
  );
}

SubmitButton.propTypes = {
  children: PropTypes.any,
};

export default SubmitButton;
