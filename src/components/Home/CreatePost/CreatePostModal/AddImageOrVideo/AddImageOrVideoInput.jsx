import { useState } from "react";
import styles from "./AddImageOrVideoInput.module.css";
import { ImagePlus, X } from "lucide-react";

export default function AddImageOrVideoInput() {
  const [files, setFiles] = useState([]);

  const handleFileChange = (e) => {
    const newSelectedFiles = [...files, e.target.files[0]];
    setFiles(newSelectedFiles);
  };

  const label =
    files.length > 0 ? (
      <label htmlFor="imageOrVideo">
        <div className={styles.addBtn}>
          <ImagePlus size={30} />
          <p>Add more images/videos</p>
        </div>
      </label>
    ) : (
      <label className={styles.label} htmlFor="imageOrVideo">
        <div className={styles.labelContainer}>
          {files.length > 0 ? (
            <></>
          ) : (
            <div className={styles.content}>
              <X className={styles.XIcon} size={40} color="#65686c" />

              <ImagePlus className={styles.plusIcon} size={50} />
              <p>
                Add image/video <br />
                <span>or drag and drop</span>
              </p>
            </div>
          )}
        </div>
      </label>
    );

  return (
    <div>
      <div>
        {files.length === 0 ? (
          label
        ) : (
          <div className={styles.gridContainer}>
            <X className={styles.XIcon} size={40} color="#65686c" />
            {label}
            {files.map((file) => (
              <div key={file.name} className={styles.preview}>
                {file.type.startsWith("image/") ? (
                  <img
                    src={URL.createObjectURL(file)}
                    alt="Preview"
                    className={styles.previewImage}
                  />
                ) : (
                  <video controls className={styles.previewVideo}>
                    <source src={URL.createObjectURL(file)} type={file.type} />
                    Your browser does not support the video tag.
                  </video>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      <input
        className={styles.input}
        onChange={handleFileChange}
        type="file"
        id="imageOrVideo"
        name="imageOrVideo"
      />
    </div>
  );
}
