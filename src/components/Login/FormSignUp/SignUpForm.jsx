import { Link } from "react-router-dom";
import Input from "../Input/Input";
import styles from "../FormSignIn/SignInForm.module.css";
import useSignUpForm from "../../../hooks/useSignUpForm";
import LoadingButton from "../../common/Spinner/LoadingButton";
import { roleData } from "./roles-data";

export default function SignUpForm() {
  const { register, errors, handleSubmit, onSubmit, validationRules, loading } =
    useSignUpForm();
  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <img
          src="/images/logo-uit.svg"
          alt="UIT Logo"
          className={styles.logo}
        />
        <h1>Sign up</h1>
      </div>
      <form
        noValidate
        onSubmit={handleSubmit(onSubmit)}
        className={styles.container}
      >
        <Input
          id="username"
          label="Username"
          placeHolder="Enter your username"
          type="text"
          isError={errors.username === null}
          register={register("username", validationRules.username)}
          required
        />
        {errors.username && (
          <p role="alert" className={styles.error}>
            {errors.username.message}
          </p>
        )}

        <Input
          id="email"
          label="Email"
          placeHolder="2152****@gm.uit.edu.vn"
          type="email"
          required
          isError={errors.email === null}
          register={register("email", validationRules.email)}
        />
        {errors.email && (
          <p role="alert" className={styles.error}>
            {errors.email.message}
          </p>
        )}

        <Input
          id="password"
          label="Password"
          placeHolder="Enter your password"
          type="password"
          required
          isError={errors.password === null}
          register={register("password", validationRules.password)}
        />
        {errors.password && (
          <p role="alert" className={styles.error}>
            {errors.password.message}
          </p>
        )}

        <Input
          id="confirmpassword"
          label="Confirm password"
          placeHolder="Enter your password"
          type="password"
          required
          isError={errors.confirmpassword === null}
          register={register(
            "confirmpassword",
            validationRules.confirmpassword
          )}
        />
        {errors.confirmpassword && (
          <p role="alert" className={styles.error}>
            {errors.confirmpassword.message}
          </p>
        )}

        <label
          htmlFor="roleId"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Select type
        </label>
        <select
          {...register("roleId")}
          id="roleId"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          {Object.entries(roleData).map(([key, data]) => (
            <option key={key} value={data.key}>
              {data.value}
            </option>
          ))}
        </select>

        <LoadingButton disabled={loading} type="submit" isLoading={loading}>
          SIGN UP
        </LoadingButton>
        <p>
          Already have an account? <Link to="/auth/login">Sign in</Link>
        </p>
      </form>
    </div>
  );
}
