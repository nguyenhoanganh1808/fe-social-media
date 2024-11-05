import styles from "./ActiveItem.module.css";
import PropTypes from "prop-types";

function ActiveItem({ person }) {
  return (
    <div className={styles.container}>
      <div className={styles.avatarContainer}>
        <img className={styles.avatar} src={person.avatarUrl} alt="" />
        {person.isOnline && <span className={styles.dot}></span>}
      </div>
      <p>{person.name}</p>
    </div>
  );
}

ActiveItem.propTypes = {
  person: PropTypes.shape({
    name: PropTypes.string.isRequired,
    avatarUrl: PropTypes.string.isRequired,
    isOnline: PropTypes.bool,
  }),
};

export default ActiveItem;
