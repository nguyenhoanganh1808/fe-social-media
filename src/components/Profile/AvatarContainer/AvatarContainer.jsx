import { Camera } from "lucide-react";

import Avatar from "../../Avatar/Avatar";
import LucideCircleButton from "../../Button/LucideCircleButton/LucideCircleButton";
import styles from "./AvatarContainer.module.css";
import PropTypes from "prop-types";
import { formatNumber } from "../../../lib/utils";

export default function AvatarContainer({ userData }) {
  return (
    <div className={styles.avatarContainer}>
      <div className={styles.followContainer}>
        <p>{formatNumber(userData.followersNumber)}</p>
        <p>Followers</p>
      </div>
      <div className={styles.avatar}>
        <Avatar src={userData.avatarUrl} size={130} />
        <label htmlFor="avatarFile">
          <LucideCircleButton size={40}>
            <Camera fill="gray" color="white" />
          </LucideCircleButton>
        </label>
        <input
          className={styles.avatarInput}
          type="file"
          id="avatarFile"
          name="avatarFile"
        />
      </div>
      <div className={styles.followContainer}>
        <p>{formatNumber(userData.followingNumber)}</p>
        <p>Following</p>
      </div>
    </div>
  );
}

AvatarContainer.propTypes = {
  userData: PropTypes.shape({
    followersNumber: PropTypes.number.isRequired,
    followingNumber: PropTypes.number.isRequired,
    avatarUrl: PropTypes.string.isRequired,
  }),
};
