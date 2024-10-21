import PropTypes from "prop-types";
import styles from "./Input.module.css";

function Input({ label, id, placeHolder, type = "text" }) {
  return (
    <label className={styles.container} htmlFor={id}>
      {label}
      <input
        className={styles.input}
        type={type}
        id={id}
        name={name}
        placeholder={placeHolder}
      />
    </label>
  );
}

Input.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  placeHolder: PropTypes.string.isRequired,
  type: PropTypes.string,
};

export default Input;
