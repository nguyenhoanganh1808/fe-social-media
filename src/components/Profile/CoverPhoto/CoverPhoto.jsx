import { Camera } from "lucide-react";
import styles from "./CoverPhoto.module.css";
import { useAuth } from "../../../hooks/useAuthContext";

export default function CoverPhoto() {
  const { user } = useAuth();
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
        id="coverPhotoInput"
        name="coverPhotoInput"
      />
    </div>
  );
}
