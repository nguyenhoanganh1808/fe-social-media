import PropTypes from "prop-types";
import styles from "./SuggestRequestCard.module.css";

function SuggestRequestCard({ person, activeTab }) {
  console.log(activeTab);
  return (
    <div className={styles.container}>
      <div className={styles.avatarAndName}>
        <img
          className={styles.avatar}
          src={person.avatarUrl}
          alt={person.name}
        />
        <div>
          <p className={styles.name}>{person.name}</p>
          <p className={styles.link}>{person.link}</p>
        </div>
      </div>
      <button className={styles.followButton}>
        {activeTab === "suggests" ? "Follow" : "Follow back"}
      </button>
    </div>
  );
}

SuggestRequestCard.propTypes = {
  person: PropTypes.shape({
    name: PropTypes.string.isRequired,
    avatarUrl: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
  }).isRequired,
  activeTab: PropTypes.oneOf(["suggests", "requests"]),
};

export default SuggestRequestCard;
