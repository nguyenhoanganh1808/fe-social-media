import Chats from "./Chats/Chats";
import Info from "./Info/Info";
import styles from "./MessageDetail.module.css";
import { PhoneIcon, VideoIcon, InfoIcon } from "lucide-react";
import useToggle from "../../../hooks/useToggle";

import { useParams } from "react-router-dom";
import PropTypes from "prop-types";
import SpinningContainer from "../../common/SpinningContainer";

export default function MessageDetail({ conversations, loading }) {
  const { isOpen: isInfoOpen, toggle: toggleInfo } = useToggle();

  const { id } = useParams();
  const otherUser = conversations.find(
    (conversation) => conversation.id == id
  ).otherUser;

  if (loading) {
    return <SpinningContainer />;
  }

  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.headerContainer}>
          <div>
            <div className={styles.avatarContainer}>
              <img className={styles.avatar} src={otherUser.avatarUrl} alt="" />
              {<span className={styles.dot}></span>}
            </div>
            <div>
              <p className={styles.name}>{otherUser.nickname}</p>
              Active now
            </div>
          </div>
          <div className={styles.icons}>
            <PhoneIcon />
            <VideoIcon />
            <InfoIcon onClick={toggleInfo} />
          </div>
        </div>
        <Chats otherUser={otherUser} />
      </div>
      {isInfoOpen && <Info userInfo={otherUser} />}
    </>
  );
}

MessageDetail.propTypes = {
  conversations: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      otherUser: PropTypes.shape({
        id: PropTypes.string.isRequired,
        avatarUrl: PropTypes.string.isRequired,
        nickname: PropTypes.string.isRequired,
        otherUser: PropTypes.object, // Adjust if you know the structure of the object
      }).isRequired,
    })
  ).isRequired,
  loading: PropTypes.bool.isRequired,
};
