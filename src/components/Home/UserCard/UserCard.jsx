import styles from "./UserCard.module.css";
import { formatNumber } from "../../../lib/utils";
import { useAuth } from "../../../hooks/useAuthContext";
import { Link } from "react-router-dom";
import useToggle from "../../../hooks/useToggle";
import FollowingList from "../../common/FollowList/FollowingList";
import FollowersLit from "../../common/FollowList/FollowersList";

function UserCard() {
  const { user } = useAuth();
  const {
    close: closeFollowing,
    isOpen: isOpenFollowing,
    open: openFollowing,
  } = useToggle();

  const {
    close: closeFollowers,
    isOpen: isOpenFollowers,
    open: openFollowers,
  } = useToggle();
  return (
    <div className={styles.container}>
      <img className={styles.avatar} src={user.avatarUrl} alt="" />
      <div className={styles.backgroundContainer}></div>
      <div className={styles.selfContainer}>
        <p className={styles.name}>{user.nickName}</p>
        <p className={styles.link}>@{user.tagName}</p>
        <p>{user.bio}</p>
      </div>

      <div className={styles.followContainer}>
        <FollowingList closeModal={closeFollowing} isOpen={isOpenFollowing} />
        <div className="hover:cursor-pointer" onClick={openFollowing}>
          <p>{formatNumber(user.followingCount)}</p>
          <p>Following</p>
        </div>
        <FollowersLit closeModal={closeFollowers} isOpen={isOpenFollowers} />

        <div onClick={openFollowers} className="hover:cursor-pointer">
          <p>{formatNumber(user.followerCount)}</p>
          <p>Followers</p>
        </div>
      </div>

      <Link className={styles.button} to={`/profile/${user.userId}`}>
        My Profile
      </Link>
    </div>
  );
}

export default UserCard;
