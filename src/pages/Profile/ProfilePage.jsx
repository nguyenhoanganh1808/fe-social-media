import styles from "./ProfilePage.module.css";
import CoverPhoto from "../../components/Profile/CoverPhoto/CoverPhoto";
import AvatarContainer from "../../components/Profile/AvatarContainer/AvatarContainer";
import NavBar from "../../components/Profile/NavBar/NavBar";
import { useAuth } from "../../hooks/useAuthContext";
import { Outlet } from "react-router-dom";

export default function ProfilePage() {
  const { user } = useAuth();

  return (
    <div className={styles.wrapper}>
      <div className={styles.upperContainer}>
        <CoverPhoto />
        <AvatarContainer />
        <div className={styles.nameContainer}>
          <p>{user.nickName}</p>
          <p>@{user.tagName}</p>
        </div>

        <NavBar />
      </div>
      <div className={styles.downContainer}>
        <Outlet />
      </div>
    </div>
  );
}
