import Input from "../Input/Input";
import styles from "./SignInForm.module.css";
import useSignInForm from "../../../hooks/useSignInForm";
import { Link } from "react-router-dom";

import LoadingButton from "../../common/Spinner/LoadingButton";

export default function SignInForm() {
  const { loading, register, handleSubmit, errors, onSubmit, validationRules } =
    useSignInForm();

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <img
          src="/images/logo-uit.svg"
          alt="UIT Logo"
          className={styles.logo}
        />
        <h1>Sign in</h1>
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
          id="password"
          label="Password"
          placeHolder="Enter your password"
          type="password"
          required
          isError={errors.username === null}
          register={register("password", validationRules.password)}
        />
        {errors.password && (
          <p role="alert" className={styles.error}>
            {errors.password.message}
          </p>
        )}

        <div className={styles.forgotPasswordContainer}>
          {/* <div>
            <input
              {...register("rememberme")}
              type="checkbox"
              id="rememberme"
              name="rememberme"
            />
            <label htmlFor="rememberme">Remember me</label>
          </div> */}
          <a href="/">Forgot your password</a>
        </div>

        <LoadingButton
          disabled={loading}
          isLoading={loading}
          className="w-full"
        >
          SIGN IN
        </LoadingButton>
        <p>
          Don&apos;t have an account? <Link to="/auth/sign-up">Sign up</Link>
        </p>
      </form>
    </div>
  );
}
