import Input from "../Input/Input";
import SubmitButton from "../SubmitButton/SubmitButton";
import styles from "./SignInForm.module.css";
import useSignInForm from "../../../hooks/useSigninForm";

export default function SignInForm() {
  const { register, handleSubmit, errors, onSubmit, validationRules } =
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
          <div>
            <input type="checkbox" id="rememberme" name="rememberme" />
            <label htmlFor="rememberme">Remember me</label>
          </div>
          <a href="/">Forgot your password</a>
        </div>

        <SubmitButton>SIGN IN</SubmitButton>
      </form>
    </div>
  );
}
