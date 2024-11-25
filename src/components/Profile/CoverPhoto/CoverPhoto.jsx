import { Camera } from "lucide-react";
import styles from "./CoverPhoto.module.css";
import PropTypes from "prop-types";

export default function CoverPhoto({ coverPhotoUrl }) {
  return (
    <div className={styles.coverPhotoContainer}>
      <img className={styles.coverPhoto} src={coverPhotoUrl} alt="" />
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

CoverPhoto.propTypes = {
  coverPhotoUrl: PropTypes.string,
};
