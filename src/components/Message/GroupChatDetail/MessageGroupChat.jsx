import Info from "../MessageDetail/Info/Info";
import styles from "../MessageDetail/MessageDetail.module.css";
import { PhoneIcon, VideoIcon, InfoIcon } from "lucide-react";
import useToggle from "../../../hooks/useToggle";

import { useOutletContext, useParams } from "react-router-dom";
import PropTypes from "prop-types";
import GroupChat from "./GroupChats";

export default function MessageGroupChat() {
  const { isOpen: isInfoOpen, toggle: toggleInfo } = useToggle();
  const {
    isOpen: isMobileInfoOpen,
    toggle: toggleMobileInfo,
    close: closeMobileInfo,
  } = useToggle();
  const { conversations } = useOutletContext();
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
        {/* <Outlet context={{ otherUser: user }} /> */}
        <GroupChat otherUser={user} />
      </div>
      {isInfoOpen && (
        <Info userInfo={user.profile} closeInfoMobile={closeMobileInfo} />
      )}
    </>
  );
}

MessageGroupChat.propTypes = {
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
