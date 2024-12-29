import { Camera } from "lucide-react";
import styles from "./CoverPhoto.module.css";
import { useAuth } from "../../../hooks/useAuthContext";
import { useState } from "react";
import ProfileService from "../../../services/profile.service";

export default function CoverPhoto() {
  const { user, setUser } = useAuth();
  const [coverImageUrl, setCoverImageUrl] = useState(user.coverImageUrl);
  const [loading, setLoading] = useState(false);

  const handleCoverPhotoChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    try {
      setLoading(true);

      await ProfileService.updateProfileImage("BACKGROUND", file);
    } catch (error) {
      console.error("Error updating cover photo:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.coverPhotoContainer}>
      <img className={styles.coverPhoto} src={user.coverImageUrl} alt="" />
      <label className={styles.changeCoverPhotoBtn} htmlFor="coverPhotoInput">
        <div>
          <Camera size={30} />
          <p>Add Cover Photo</p>
        </div>
      </label>
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
