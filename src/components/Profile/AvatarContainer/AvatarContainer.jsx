import { Camera } from "lucide-react";

import Avatar from "../../Avatar/Avatar";
import LucideCircleButton from "../../Button/LucideCircleButton/LucideCircleButton";
import styles from "./AvatarContainer.module.css";
import PropTypes from "prop-types";
import { formatNumber } from "../../../lib/utils";
import { useAuth } from "../../../hooks/useAuthContext";
import { useState } from "react";
import { toast } from "react-toastify";
import ProfileService from "../../../services/profile.service";

export default function AvatarContainer({ userInfo }) {
  const { user, setUser } = useAuth();
  const [avatarUrl, setAvatarUrl] = useState(userInfo.avatarUrl);

  const handleAvatarUrl = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const response = await toast.promise(
      ProfileService.updateProfileImage("AVATAR", file),
      {
        pending: "Uploading avatar photo...",
        success: "Avatar photo uploaded successfully 👌",
        error: "Failed to upload avatar photo 🤯",
      }
    );

    if (response.error) {
      toast.error(response.error);
      return;
    }

    const url = URL.createObjectURL(file);
    setAvatarUrl(url);
    setUser((prevUser) => ({ ...prevUser, avatarUrl: url }));
  };

  return (
    <div className={styles.avatarContainer}>
      <div className={styles.followContainer}>
        <p>{formatNumber(user.followerCount)}</p>
        <p>Followers</p>
      </div>
      <div className={styles.avatar}>
        <Avatar src={avatarUrl} size={130} />
        {userInfo.userId === user.userId && (
          <label htmlFor="avatarFile">
            <LucideCircleButton size={40}>
              <Camera fill="gray" color="white" />
            </LucideCircleButton>
          </label>
        )}
        <input
          onChange={handleAvatarUrl}
          className={styles.avatarInput}
          type="file"
          id="avatarFile"
          name="avatarFile"
        />
      </div>
      <div className={styles.followContainer}>
        <p>{formatNumber(user.followingCount)}</p>
        <p>Following</p>
      </div>
    </div>
  );
}

AvatarContainer.propTypes = {
  userInfo: PropTypes.shape({
    userId: PropTypes.string.isRequired,
    avatarUrl: PropTypes.string,
  }),
};
