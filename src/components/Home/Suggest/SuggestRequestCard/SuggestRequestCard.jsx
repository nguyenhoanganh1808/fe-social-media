import PropTypes from "prop-types";
import styles from "./SuggestRequestCard.module.css";

function SuggestRequestCard({ person }) {
  return (
    <div className={styles.container}>
      <img className={styles.avatar} src={person.avatarUrl} alt={person.name} />
      <p>{person.name}</p>
      <div>
        <p>{person.name}</p>
        <p>{person.link}</p>
      </div>
      <button className={styles.followButton}>Follow back</button>
    </div>
  );
}

SuggestRequestCard.propTypes = {
  person: PropTypes.shape({
    name: PropTypes.string.isRequired,
    avatarUrl: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
  }).isRequired,
};

export default SuggestRequestCard;
