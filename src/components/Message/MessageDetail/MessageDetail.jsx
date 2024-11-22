import Chats from "./Chats/Chats";
import Info from "./Info/Info";
import styles from "./MessageDetail.module.css";
import { PhoneIcon, VideoIcon, InfoIcon } from "lucide-react";
import useToggle from "../../../hooks/useToggle";

export default function MessageDetail() {
  const { isOpen: isInfoOpen, toggle: toggleInfo } = useToggle();
  const chatData = {
    user: {
      avatarUrl:
        "https://helios-i.mashable.com/imagery/articles/05c4IP1XV043hN2GYTXjwBP/hero-image.fill.size_1200x1200.v1708642421.jpg",
      isOnline: true,
      name: "Michel",
    },
    lastMessage: "Hey, how's it going?",
  };

  const person = chatData.user;

  return (
    <>
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
            <InfoIcon onClick={toggleInfo} />
          </div>
        </div>
        <Chats />
      </div>
      {isInfoOpen && <Info chatData={chatData} />}
    </>
  );
}
