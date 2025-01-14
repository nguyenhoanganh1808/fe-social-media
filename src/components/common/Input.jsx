import ErrorText from "./ErrorText";
import PropTypes from "prop-types";

export default function Input({ errors, label, type, id, register, rules }) {
  return (
    <div className="space-y-2">
      <label
        htmlFor={id}
        className={`"block mb-2 text-base font-medium " ${
          errors
            ? "text-red-700 dark:text-red-500"
            : "focus:text-green-700 focus:dark:text-green-500"
        }`}
      >
        {label}
      </label>
      <input
        {...register(id, rules)}
        type={type}
        id={id}
        className={
          errors
            ? "bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 dark:bg-gray-700 focus:border-red-500 block w-full p-2.5 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500"
            : "focus:bg-green-50 border 0 focus:text-green-900 focus:dark:text-green-400 focus:placeholder-green-700 dark:placeholder-green-500 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-green-500"
        }
        placeholder=""
      />
      {errors && <ErrorText text={errors.message} />}
    </div>
  );
}

Input.propTypes = {
  errors: PropTypes.shape({
    message: PropTypes.string,
  }),
  register: PropTypes.func.isRequired,
  rules: PropTypes.object,
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};
