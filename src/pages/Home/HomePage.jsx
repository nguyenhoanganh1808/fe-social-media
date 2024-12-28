import { Outlet, useNavigate, useParams } from "react-router-dom";
import ActiveFriendList from "../../components/Home/ActiveFriendList/ActiveFriendList";
import Communities from "../../components/Home/Communities/Communities";
import Suggest from "../../components/Home/Suggest/Suggest";
import UserCard from "../../components/Home/UserCard/UserCard";
import styles from "./HomePage.module.css";
import { useEffect } from "react";

export default function HomePage() {
  const navigate = useNavigate();
  const { id } = useParams();

  // Redirect to /posts on component mount
  useEffect(() => {
    if (id) {
      return;
    }
    navigate("/posts");
  }, [id, navigate]);

  return (
    <main className={styles.container}>
      <div className={styles.leftContainer}>
        <UserCard followersNumber={1984} followingNumber={2003} />
        <Communities />
      </div>
      <div className={styles.postListContainer}>
        <Outlet />
      </div>
      <div className={styles.suggestContainer}>
        <Suggest />
        <ActiveFriendList />
      </div>
    </main>
  );
}
