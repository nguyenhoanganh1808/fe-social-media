import styles from "./LucideCircleButton.module.css";
import PropTypes from "prop-types";

export default function LucideCircleButton({ children, isHoverFill = false }) {
  return (
    <button
      className={`${styles.iconContainer} ${
        isHoverFill ? styles.hoverFill : ""
      }`}
    >
      {children}
    </button>
  );
}

LucideCircleButton.propTypes = {
  children: PropTypes.element.isRequired,
  isHoverFill: PropTypes.bool,
};
