import styles from "./SkillItem.module.css";
import PropTypes from "prop-types";

export default function SkillItem({ skill }) {
  return <div className={styles.container}>{skill}</div>;
}

SkillItem.propTypes = {
  skill: PropTypes.string.isRequired,
};
