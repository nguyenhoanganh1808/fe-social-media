import { NavLink } from "react-router-dom";
import styles from "./ChatItem.module.css";
import PropTypes from "prop-types";

export default function ChatItem({ conversation }) {
  const person = conversation.lastMessage.senderId;

  return (
    <NavLink
      className={({ isActive }) =>
        `${styles.container} ${isActive ? "bg-blue-100" : ""}`
      }
      to={`/message/${conversation.id}`}
    >
      <div className={styles.avatarContainer}>
        <img className={styles.avatar} src={person.avatarUrl} alt="" />
        {<span className={styles.dot}></span>}
      </div>
      <div>
        <span className="font-semibold text-black">{person.nickname}</span>
        <p className={styles.chat}>{conversation.lastMessage.content}</p>
      </div>
    </NavLink>
  );
}

ChatItem.propTypes = {
  conversation: PropTypes.shape({
    id: PropTypes.number.isRequired,
    lastMessage: PropTypes.shape({
      content: PropTypes.string,
      senderId: PropTypes.shape({
        avatarUrl: PropTypes.string,
        isOnline: PropTypes.bool,
        nickname: PropTypes.string.isRequired,
      }),
    }),
  }),
};
