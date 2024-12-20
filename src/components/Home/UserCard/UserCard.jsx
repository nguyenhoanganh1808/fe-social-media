import PropTypes from "prop-types";
import styles from "./UserCard.module.css";
import { formatNumber } from "../../../lib/utils";

function UserCard({ followersNumber, followingNumber, name, link, bio }) {
  return (
    <div className={styles.container}>
      <img
        className={styles.avatar}
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStqtktl3g6wWkAzvUAi32yzYgb-jZ0-Pn0sQ&s"
        alt=""
      />
      <div className={styles.backgroundContainer}></div>
      <div className={styles.selfContainer}>
        <p className={styles.name}>{name}</p>
        <p className={styles.link}>{link}</p>
        <p>{bio}</p>
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

      <a className={styles.button} href="">
        My Profile
      </a>
    </div>
  );
}

UserCard.propTypes = {
  followersNumber: PropTypes.number,
  followingNumber: PropTypes.number,
  name: PropTypes.string.isRequired,
  link: PropTypes.string,
  bio: PropTypes.string,
};

export default UserCard;
