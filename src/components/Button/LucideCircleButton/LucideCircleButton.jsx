import styles from "./LucideCircleButton.module.css";
import PropTypes from "prop-types";

export default function LucideCircleButton({
  children,
  isHoverFill = false,
  onClick,
  size = 65,
  color = "#38bdf8",
  type = "button",
}) {
  const sizeInPx = size + "px";
  return (
    <button
      type={type}
      onClick={onClick}
      className={`${styles.iconContainer} ${
        isHoverFill ? styles.hoverFill : ""
      }`}
      style={{
        "--size": sizeInPx,
        "--color": color,
      }}
    >
      {children}
    </button>
  );
}

LucideCircleButton.propTypes = {
  children: PropTypes.element.isRequired,
  isHoverFill: PropTypes.bool,
  onClick: PropTypes.func,
  size: PropTypes.number,
  color: PropTypes.string,
  type: PropTypes.string,
};
