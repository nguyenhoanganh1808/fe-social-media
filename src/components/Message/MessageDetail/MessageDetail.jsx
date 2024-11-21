import Chats from "./Chats/Chats";
import styles from "./MessageDetail.module.css";
import { PhoneIcon, VideoIcon, InfoIcon } from "lucide-react";

export default function MessageDetail() {
  const chatData = {
    user: {
      avatarUrl: "https://example.com/avatar1.jpg",
      isOnline: true,
      name: "Michel",
    },
    lastMessage: "Hey, how's it going?",
  };

  const person = chatData.user;

  return (
    <div className={styles.wrapper}>
      <div className={styles.headerContainer}>
        <div>
          <div className={styles.avatarContainer}>
            <img className={styles.avatar} src={person.avatarUrl} alt="" />
            {person.isOnline && <span className={styles.dot}></span>}
          </div>
          <div>
            <p className={styles.name}>{person.name}</p>
            Active now
          </div>
        </div>
        <div className={styles.icons}>
          <PhoneIcon />
          <VideoIcon />
          <InfoIcon />
        </div>
      </div>
      <Chats />
    </div>
  );
}
