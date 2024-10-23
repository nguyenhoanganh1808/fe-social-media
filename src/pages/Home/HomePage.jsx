import Header from "../../components/Header/Header";
import UserCard from "../../components/Home/UserCard/UserCard";
import styles from "./HomePage.module.css";

export default function HomePage() {
  return (
    <div className={styles.wrapper}>
      <Header />
      <main className={styles.container}>
        <div>
          <UserCard
            name="Bryan Nguyen"
            bio="Hello ,I’m UI / UX designer. Open to the new Project"
            followersNumber={1984}
            followingNumber={2003}
            link="@bryannguyen"
          />
          <div>Skills</div>
          <div>Communities</div>
        </div>
        <div>Post</div>
        <div>Suggest</div>
      </main>
    </div>
  );
}
