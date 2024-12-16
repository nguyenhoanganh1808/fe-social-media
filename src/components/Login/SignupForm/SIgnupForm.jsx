import { Link } from "react-router-dom";
import Input from "../Input/Input";
import styles from "../SignInForm/SignInForm.module.css";
import SubmitButton from "../SubmitButton/SubmitButton";
import useSignUpForm from "../../../hooks/useSignupForm";

export default function SignupForm() {
  const { register, errors, handleSubmit, onSubmit, validationRules } =
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

        <SubmitButton>SIGN UP</SubmitButton>
        <p>
          Already have an account? <Link to="/auth/login">Sign in</Link>
        </p>
      </form>
    </div>
  );
}
