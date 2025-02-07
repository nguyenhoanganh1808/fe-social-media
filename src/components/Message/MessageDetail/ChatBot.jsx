import { CHAT_BOT_AVATAR } from "../../../lib/constants";
import Chats from "./Chats/Chats";
import styles from "./MessageDetail.module.css";
export default function ChatBot() {
  const user = {
    profile: {
      avatarUrl: CHAT_BOT_AVATAR,
      nickName: "Chat bot",
    },
  };
  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.headerContainer}>
          <div>
            <div className={styles.avatarContainer}>
              <img
                className={styles.avatar}
                src={user.profile.avatarUrl}
                alt=""
              />
              <span className={styles.dot}></span>
            </div>
            <div className="truncate">
              <p className={styles.name}>{user.profile.nickName}</p>
              Active now
            </div>
          </div>
          <div className={styles.icons}></div>
        </div>

        <Chats otherUser={user} />
      </div>
    </>
  );
}
