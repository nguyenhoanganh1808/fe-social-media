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
    isOpen: isMobileInfoOpen,
    toggle: toggleMobileInfo,
    close: closeMobileInfo,
  } = useToggle();

  const { id } = useParams();
  if (!id) return;

  const currentConversation = conversations?.find(
    (conv) => conv.id === parseInt(id)
  );
  console.log("currentConver: ", currentConversation);
  const user = currentConversation
    ? currentConversation.otherUser.student ||
      currentConversation.otherUser.lecturer
    : { avatarUrl: "", nickname: "" };

  return (
    <>
      {isMobileInfoOpen && (
        <Info userInfo={user.profile} closeInfoMobile={closeMobileInfo} />
      )}
      <div
        className={`${styles.wrapper} ${
          isMobileInfoOpen ? "hidden" : "visible"
        }`}
      >
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
          <div className={styles.icons}>
            <PhoneIcon />
            <VideoIcon />
            <InfoIcon className="md:block hidden" onClick={toggleInfo} />
            <InfoIcon className="md:hidden block" onClick={toggleMobileInfo} />
          </div>
        </div>

        <Chats otherUser={user} />
      </div>
      {isInfoOpen && (
        <Info userInfo={user.profile} closeInfoMobile={closeMobileInfo} />
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
      }).isRequired,
    })
  ).isRequired,
};
