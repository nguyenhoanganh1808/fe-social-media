import styles from "./ChatItem.module.css";
import PropTypes from "prop-types";

export default function ChatItem({ chatData }) {
  const person = chatData.user;
  return (
    <div className={styles.container}>
      <div className={styles.avatarContainer}>
        <img className={styles.avatar} src={person.avatarUrl} alt="" />
        {person.isOnline && <span className={styles.dot}></span>}
      </div>
      <div>
        <p>{person.name}</p>
        <p className={styles.chat}>{chatData.lastMessage}</p>
      </div>
    </div>
  );
}

ChatItem.propTypes = {
  chatData: PropTypes.shape({
    user: {
      avatarUrl: PropTypes.string,
      isOnline: PropTypes.bool,
      name: PropTypes.string.isRequired,
    },
    lastMessage: PropTypes.string,
  }),
};
