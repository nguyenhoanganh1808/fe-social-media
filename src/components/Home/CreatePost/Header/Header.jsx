import { ArrowLeft, X } from "lucide-react";
import LucideCircleButton from "../../../Button/LucideCircleButton/LucideCircleButton";
import styles from "./Header.module.css";
import PropTypes from "prop-types";

export default function Header({
  title,
  addGifPickerVisible,
  closeGifPicker,
  closeDialog,
}) {
  return (
    <div className={styles.header}>
      {addGifPickerVisible && (
        <LucideCircleButton color="#e2e5e9" size={45} onClick={closeGifPicker}>
          <ArrowLeft color="#1c1e21" />
        </LucideCircleButton>
      )}
      <h1>{addGifPickerVisible ? "Choose a GIF" : title}</h1>
      <X
        onClick={closeDialog}
        className={styles.closeBtn}
        size={40}
        color="#ccc"
      />
    </div>
  );
}

Header.propTypes = {
  addGifPickerVisible: PropTypes.bool,
  closeGifPicker: PropTypes.func,
  closeDialog: PropTypes.func,
  title: PropTypes.string.isRequired,
};
