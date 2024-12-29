import { Camera } from "lucide-react";
import styles from "./CoverPhoto.module.css";
import { useAuth } from "../../../hooks/useAuthContext";
import { useState } from "react";
import ProfileService from "../../../services/profile.service";
import { toast } from "react-toastify";
import { UserService } from "../../../services/user.service";

export default function CoverPhoto() {
  const { user, setUser } = useAuth();
  const [coverImageUrl, setCoverImageUrl] = useState(user.coverImageUrl);

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
