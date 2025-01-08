import Chats from "./Chats/Chats";
import Info from "./Info/Info";
import styles from "./MessageDetail.module.css";
import { PhoneIcon, VideoIcon, InfoIcon } from "lucide-react";
import useToggle from "../../../hooks/useToggle";

import { useParams } from "react-router-dom";
import PropTypes from "prop-types";

export default function MessageDetail({ conversations }) {
  const { isOpen: isInfoOpen, toggle: toggleInfo } = useToggle();
  const {
    isOpen: isInfoOpenMobile,
    toggle: toggleInfoMobile,
    close: closeInfoMobile,
  } = useToggle();

  const { id } = useParams();

  if (!id) return;

  const conversation = conversations?.find(
    (conversation) => conversation.id == id
  );
  const otherUser = conversation
    ? conversation.otherUser
    : { avatarUrl: "", nickname: "" };

  return (
    <>
      {isInfoOpenMobile && (
        <Info userInfo={otherUser} closeInfoMobile={closeInfoMobile} />
      )}
      <div
        className={`${styles.wrapper} ${
          isInfoOpenMobile ? "hidden" : "visible"
        }`}
      >
        <div className={styles.headerContainer}>
          <div>
            <div className={styles.avatarContainer}>
              <img className={styles.avatar} src={otherUser.avatarUrl} alt="" />
              {<span className={styles.dot}></span>}
            </div>
            <div className="truncate">
              <p className={`${styles.name} `}>{otherUser.nickname}</p>
              Active now
            </div>
          </div>
          <div className={styles.icons}>
            <PhoneIcon />
            <VideoIcon />
            <InfoIcon className="md:block hidden" onClick={toggleInfo} />
            <InfoIcon className="md:hidden block" onClick={toggleInfoMobile} />
          </div>
        </div>

        <Chats otherUser={otherUser} />
      </div>
      {isInfoOpen && (
        <Info closeInfoMobile={closeInfoMobile} userInfo={otherUser} />
      )}
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
        otherUser: PropTypes.object,
      }).isRequired,
    })
  ).isRequired,
};
