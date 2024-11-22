import PropTypes from "prop-types";
import styles from "./Avatar.module.css";

export default function Avatar({ size = 50, src, alt }) {
  const style = {
    width: size,
    height: size,
  };
  return <img className={styles.avatar} style={style} src={src} alt={alt} />;
}

Avatar.propTypes = {
  size: PropTypes.number,
  src: PropTypes.string.isRequired,
  alt: PropTypes.string,
};
