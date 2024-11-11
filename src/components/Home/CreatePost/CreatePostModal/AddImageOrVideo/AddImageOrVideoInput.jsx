import styles from "./AddImageOrVideoInput.module.css";
import { ImagePlus, X } from "lucide-react";

export default function AddImageOrVideoInput() {
  return (
    <div>
      <label className={styles.label} htmlFor="imageOrVideo">
        <div className={styles.labelContainer}>
          <div className={styles.content}>
            <X className={styles.XIcon} size={40} color="#65686c" />
            <ImagePlus className={styles.plusIcon} size={50} />
            <p>
              Add image/video <br />
              <span>or drag and drop</span>
            </p>
          </div>
        </div>
      </label>
      <input
        className={styles.input}
        type="file"
        id="imageOrVideo"
        name="imageOrVideo"
      />
    </div>
  );
}
