import styles from "./ProfilePage.module.css";
import CoverPhoto from "../../components/Profile/CoverPhoto/CoverPhoto";
import AvatarContainer from "../../components/Profile/AvatarContainer/AvatarContainer";
import NavBar from "../../components/Profile/NavBar/NavBar";
import { Outlet, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ProfileService from "../../services/profile.service";
import Spinner from "../../components/common/Spinner/Spinner";

export default function ProfilePage() {
  const { id } = useParams();
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    async function fetch() {
      const result = await ProfileService.getProfileByUserId(id);
      if (result.success) {
        setUserInfo(result.data);
      }
    }
    fetch();
  }, [id]);

  if (!userInfo) {
    return <Spinner borderWidth={3} />;
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.upperContainer}>
        <CoverPhoto userInfo={userInfo} />
        <AvatarContainer userInfo={userInfo} />
        <div className={styles.nameContainer}>
          <p>{userInfo.nickName}</p>
          <p>@{userInfo.tagName}</p>
        </div>
        <NavBar />
      </div>
      <div className={styles.downContainer}>
        <Outlet />
      </div>
    </div>
  );
}
