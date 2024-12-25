import PropTypes from "prop-types";
import styles from "./UserCard.module.css";
import { formatNumber } from "../../../lib/utils";
import { useAuth } from "../../../hooks/useAuthContext";
import { Link } from "react-router-dom";

function UserCard({ followersNumber, followingNumber }) {
  const { user } = useAuth();
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
        <div>
          <p>{formatNumber(followingNumber)}</p>
          <p>Following</p>
        </div>
        <div>
          <p>{formatNumber(followersNumber)}</p>
          <p>Followers</p>
        </div>
      </div>

      <Link className={styles.button} to={`/profile/${user.id}`}>
        My Profile
      </Link>
    </div>
  );
}

UserCard.propTypes = {
  followersNumber: PropTypes.number,
  followingNumber: PropTypes.number,
};

export default UserCard;
