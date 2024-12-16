import PropTypes from "prop-types";
import styles from "./Input.module.css";

function Input({
  label,
  id,
  placeHolder,
  type = "text",
  register,
  required,
  minLength,
  maxLength,
  isError,
}) {
  return (
    <>
      <label className={styles.container} htmlFor={id}>
        {label}
      </label>
      <input
        id={id}
        name={id}
        required={required}
        minLength={minLength}
        maxLength={maxLength}
        className={`${styles.input} ${isError ? styles.error : ""}`}
        type={type}
        placeholder={placeHolder}
        {...register}
      />
    </>
  );
}

Input.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  placeHolder: PropTypes.string.isRequired,
  type: PropTypes.string,
  register: PropTypes.any,
  required: PropTypes.bool.isRequired,
  minLength: PropTypes.number,
  maxLength: PropTypes.number,
  isError: PropTypes.bool.isRequired,
};

export default Input;
