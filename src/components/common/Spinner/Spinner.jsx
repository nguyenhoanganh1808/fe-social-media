import styles from "./Spinner.module.css";
import PropTypes from "prop-types";

export default function Spinner({ size = 40, borderWidth = 5 }) {
  const sizeInPx = size + "px";
  const borderWidthInPx = borderWidth + "px";
  return (
    <div
      style={{
        "--size": sizeInPx,
        "--width": borderWidthInPx,
      }}
      className={styles.loader}
    ></div>
  );
}

Spinner.propTypes = {
  size: PropTypes.number,
  borderWidth: PropTypes.number,
};
