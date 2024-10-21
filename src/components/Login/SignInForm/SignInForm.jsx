import Input from "../Input/Input";
import SubmitButton from "../SubmitButton/SubmitButton";
import styles from "./SignInForm.module.css";

export default function SignInForm() {
  return (
    <form action="" className={styles.container}>
      <h1 className={styles.header}>Log in to your account</h1>

      <p>
        <Input
          id="email"
          label="Email"
          placeHolder="example@gmail.com"
          type="email"
        />
      </p>
      <p>
        <Input
          id="password"
          label="Password"
          placeHolder="Enter your password"
          type="password"
        />
      </p>

      <p className={styles.forgotPasswordContainer}>
        <a href="/">Forgot your password</a>
      </p>

      <p>
        <SubmitButton >Login</SubmitButton>
      </p>
    </form>
  );
}
