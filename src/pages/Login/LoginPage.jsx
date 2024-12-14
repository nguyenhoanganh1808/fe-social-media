import styles from "./LoginPage.module.css";
import SignInForm from "../../components/Login/SignInForm/SignInForm";
// import bgImage from "/images/login-bg.png";

export default function LoginPage() {
  return (
    <main className={styles.container}>
      <div className={styles.signInWrapper}>
        <SignInForm />
      </div>
    </main>
  );
}
