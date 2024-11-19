import { useState } from "react";
import styles from "./AddImageOrVideoInput.module.css";
import { ImagePlus, X } from "lucide-react";
import CustomSlider from "../CustomSlider/CustomSlider";
import PropTypes from "prop-types";

export default function AddImageOrVideoInput({ onClose }) {
  const [files, setFiles] = useState([]);

  const handleFileChange = (e) => {
    const newSelectedFiles = [...files, ...e.target.files];
    setFiles(newSelectedFiles);
  };

  const label =
    files.length > 0 ? (
      <label className={styles.addBtn} htmlFor="imageOrVideo">
        <div>
          <ImagePlus size={30} />
          <p>Add more images/videos</p>
        </div>
      </label>
    ) : (
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
    );

  const mediaList = files.map((file) => {
    if (file.type.startsWith("image/")) {
      return { url: URL.createObjectURL(file), type: "image" };
    } else {
      return {
        url: URL.createObjectURL(file),
        type: "video",
      };
    }
  });

  return (
    <div>
      <div>
        {files.length === 0 ? (
          label
        ) : (
          <div className={styles.imageContainer}>
            <X
              onClick={onClose}
              className={styles.XIcon}
              size={40}
              color="#65686c"
            />
            {label}
            <CustomSlider mediaList={mediaList} />
          </div>
        )}
      </div>

      <input
        className={styles.input}
        onChange={handleFileChange}
        type="file"
        id="imageOrVideo"
        name="imageOrVideo"
        multiple
      />
    </div>
  );
}

AddImageOrVideoInput.propTypes = {
  onClose: PropTypes.func,
};
