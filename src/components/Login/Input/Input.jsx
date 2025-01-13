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
  isRow = false,
}) {
  return (
    <>
      <label
        className={`${styles.container} ${
          isRow ? styles.rowContainer : ""
        } block mb-2 text-sm font-medium text-gray-900 dark:text-white`}
        htmlFor={id}
      >
        {label}
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
      </label>
    </>
  );
}

Input.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  placeHolder: PropTypes.string,
  type: PropTypes.string,
  register: PropTypes.any,
  required: PropTypes.bool.isRequired,
  minLength: PropTypes.number,
  maxLength: PropTypes.number,
  isError: PropTypes.bool.isRequired,
  isRow: PropTypes.bool,
};

export default Input;
