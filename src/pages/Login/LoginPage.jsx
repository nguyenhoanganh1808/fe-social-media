import styles from "./LoginPage.module.css";
import SignInForm from "../../components/Login/SignInForm/SignInForm";
// import bgImage from "/images/login-bg.png";

export default function LoginPage() {
  return (
    <main className={styles.container}>
      <img className={styles.bgImage} src="https://huongnghiep.hocmai.vn/wp-content/uploads/2022/02/image11.jpg" />
      <div className={styles.signInWrapper}>
        <SignInForm />
      </div>
    </main>
  );
}
