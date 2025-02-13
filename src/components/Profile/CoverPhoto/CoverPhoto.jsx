import { Camera } from "lucide-react";
import styles from "./CoverPhoto.module.css";
import { useAuth } from "../../../hooks/useAuthContext";
import { useState } from "react";
import ProfileService from "../../../services/profile.service";
import { toast } from "react-toastify";
import PropTypes from "prop-types";

export default function CoverPhoto({ userInfo }) {
  const { user, setUser } = useAuth();
  const [coverImageUrl, setCoverImageUrl] = useState(userInfo.coverImageUrl);

  const handleCoverPhotoChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const response = await toast.promise(
      ProfileService.updateProfileImage("BACKGROUND", file),
      {
        pending: "Uploading cover photo...",
        success: "Cover photo uploaded successfully 👌",
        error: "Failed to upload cover photo 🤯",
      }
    );

    if (response.error) {
      toast.error(response.error);
      return;
    }

    const url = URL.createObjectURL(file);
    setCoverImageUrl(url);
    setUser((prevUser) => ({ ...prevUser, coverImageUrl: url }));
  };

  return (
    <div className={styles.coverPhotoContainer}>
      <img className={styles.coverPhoto} src={coverImageUrl} alt="" />
      {userInfo.userId === user.userId && (
        <label className={styles.changeCoverPhotoBtn} htmlFor="coverPhotoInput">
          <div>
            <Camera size={30} />
            <p>Edit Cover Photo</p>
          </div>
        </label>
      )}
      <input
        className={styles.changeCoverPhotoInput}
        type="file"
        onChange={handleCoverPhotoChange}
        id="coverPhotoInput"
        name="coverPhotoInput"
      />
    </div>
  );
}

CoverPhoto.propTypes = {
  userInfo: PropTypes.shape({
    userId: PropTypes.string.isRequired,
    coverImageUrl: PropTypes.string,
  }),
};
