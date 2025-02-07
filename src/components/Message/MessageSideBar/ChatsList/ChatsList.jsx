import { NavLink } from "react-router-dom";
import ChatGroupList from "./ChatGroupList";
import ChatItem from "./ChatItem/ChatItem";
import PropTypes from "prop-types";
import styles from "./ChatItem/ChatItem.module.css";
import { CHAT_BOT_AVATAR } from "../../../../lib/constants";

export default function ChatList({ data, activeTab }) {
  if (activeTab === "Group") {
    return <ChatGroupList />;
  }

  return (
    <div>
      <ul>
        <NavLink
          className={({ isActive }) =>
            `${styles.container} ${isActive ? "bg-blue-100" : ""}`
          }
          to={`/message/chat-bot`}
        >
          <div className={styles.avatarContainer}>
            <img className={styles.avatar} src={CHAT_BOT_AVATAR} alt="" />
            {<span className={styles.dot}></span>}
          </div>
          <div className="md:block hidden truncate">
            <span className="font-semibold text-black">Chatbot</span>
            {/* <p className={`${styles.chat} truncate max-w-1`}>
          <strong>{author}: </strong> {conversation.lastMessage.content} -{" "}
          <span>{createdAt}</span>
        </p> */}
          </div>
        </NavLink>
        {data.map((conversation) => {
          return (
            <ChatItem
              key={conversation.id}
              conversation={conversation}
              activeTab={activeTab}
            />
          );
        })}
      </ul>
    </div>
  );
}

ChatList.propTypes = {
  data: PropTypes.any,
  activeTab: PropTypes.string.isRequired,
};
