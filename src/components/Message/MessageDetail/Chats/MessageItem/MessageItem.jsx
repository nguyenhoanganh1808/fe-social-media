import PropTypes from "prop-types";
import styles from "./MessageItem.module.css";

export default function MessageItem({ messageData }) {
  const authorId = 1;
  const isAuthor = authorId === messageData.id;
  return (
    <div
      className={`${styles.container} ${
        isAuthor ? styles.authorContainer : ""
      }`}
    >
      <img className={styles.avatar} src={messageData.user.avatarUrl} alt="" />
      <p>{messageData.lastMessage}</p>
    </div>
  );
}

MessageItem.propTypes = {
  messageData: PropTypes.shape({
    id: PropTypes.number,
    user: PropTypes.shape({
      name: PropTypes.string,
      avatarUrl: PropTypes.string,
    }),
    lastMessage: PropTypes.string,
    timestamp: PropTypes.string,
  }),
};
