import styles from "./AddImageOrVideoInput.module.css";
import { ImagePlus, X } from "lucide-react";
import PropTypes from "prop-types";
import { useFormContext } from "react-hook-form";
import { useEffect, useState } from "react";
import { CustomCarousel } from "../CustomSlider/Carousel";

export default function AddImageOrVideoInput({ onClose, defaultFiles = [] }) {
  const { register, setValue, getValues } = useFormContext();
  const [fileArray, setFileArray] = useState([]);

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files).map((file) => {
      if (file.type.startsWith("image/")) {
        return { url: URL.createObjectURL(file), type: "IMAGE" };
      } else {
        return {
          url: URL.createObjectURL(file),
          type: "VIDEO",
        };
      }
    });

    setFileArray((prevFiles) => [...prevFiles, ...selectedFiles]);

    setValue("mediaFiles", [
      ...(getValues("mediaFiles") || []),
      ...Array.from(e.target.files),
    ]);
  };

  const label =
    fileArray.length > 0 ? (
      <label className={styles.addBtn} htmlFor="mediaFiles">
        <div>
          <ImagePlus size={30} />
          <p>Add more images</p>
        </div>
      </label>
    ) : (
      <label className={styles.label} htmlFor="mediaFiles">
        <X
          className={styles.XIcon}
          onClick={() => {
            onClose();
            setValue("mediaFiles", []);
          }}
          size={40}
          color="#65686c"
        />
        <div className={styles.labelContainer}>
          <div className={styles.content}>
            <ImagePlus className={styles.plusIcon} size={50} />
            <p>
              Add image/video <br />
              <span>or drag and drop</span>
            </p>
          </div>
        </div>
      </label>
    );

  useEffect(() => {
    if (defaultFiles.length > 0) {
      const initialFiles = defaultFiles.map((url) => ({ url, type: "image" })); // Assuming defaultFiles are image URLs
      setFileArray(initialFiles);
      setValue("mediaFiles", initialFiles);
    }
  }, [defaultFiles, setValue]);

  return (
    <div>
      <div>
        {fileArray.length === 0 ? (
          label
        ) : (
          <div className={styles.imageContainer}>
            <X
              onClick={() => {
                setFileArray([]);
                setValue("mediaFiles", []);
                onClose();
              }}
              className={styles.XIcon}
              size={40}
              color="#65686c"
            />
            {label}
            <CustomCarousel medias={fileArray} />
          </div>
        )}
      </div>

      <input
        {...register("mediaFiles")}
        className={styles.input}
        onChange={handleFileChange}
        type="file"
        id="mediaFiles"
        name="mediaFiles"
        multiple
        accept="image/*,video/*"
      />
    </div>
  );
}

AddImageOrVideoInput.propTypes = {
  onClose: PropTypes.func.isRequired,
  defaultFiles: PropTypes.arrayOf(PropTypes.string),
};
