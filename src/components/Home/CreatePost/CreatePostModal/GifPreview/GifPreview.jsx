import { X } from "lucide-react";
import PropTypes from "prop-types";
import styles from "./GifPreview.module.css";

export default function GifPreview({ gifUrl, onClose }) {
  return (
    <div className={styles.wrapper}>
      <X onClick={onClose} className={styles.XIcon} size={40} color="#65686c" />
      <img src={gifUrl} alt="Gif preview" />
    </div>
  );
}

GifPreview.propTypes = {
  gifUrl: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};
