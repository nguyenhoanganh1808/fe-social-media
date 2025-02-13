import styles from "./ProfilePage.module.css";
import CoverPhoto from "../../components/Profile/CoverPhoto/CoverPhoto";
import AvatarContainer from "../../components/Profile/AvatarContainer/AvatarContainer";
import NavBar from "../../components/Profile/NavBar/NavBar";
import { Outlet, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ProfileService from "../../services/profile.service";
import Spinner from "../../components/common/Spinner/Spinner";
// import LoadingButton from "../../components/common/Spinner/LoadingButton";
// import { useAuth } from "../../hooks/useAuthContext";

export default function ProfilePage() {
  const { id } = useParams();
  const [userInfo, setUserInfo] = useState(null);
  // const { user } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetch() {
      setLoading(true);
      const result = await ProfileService.getProfileByUserId(id);
      if (result.success) {
        setUserInfo(result.data);
      }
      setLoading(false);
    }
    fetch();
  }, [id]);

  if (loading) {
    return (
      <div className="w-screen flex justify-center">
        <Spinner borderWidth={3} />
      </div>
    );
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
        {/* {user.userId !== id && (
          <div className="flex justify-center m-3">
            <LoadingButton>Follow</LoadingButton>
            <Link to={`/message/${id}`}>
              <LoadingButton>Message</LoadingButton>
            </Link>
          </div>
        )} */}
        <NavBar />
      </div>
      <div className={styles.downContainer}>
        <Outlet context={{ userInfo }} />
      </div>
    </div>
  );
}
