import Info from "../MessageDetail/Info/Info";
import styles from "../MessageDetail/MessageDetail.module.css";
import { PhoneIcon, VideoIcon, InfoIcon } from "lucide-react";
import useToggle from "../../../hooks/useToggle";

import { useParams } from "react-router-dom";
import PropTypes from "prop-types";
import GroupChat from "./GroupChats";
import { useCallback } from "react";
import useFetch from "../../../hooks/useFetch";
import { ChatGroupService } from "../../../services/chat-group.service";

export default function MessageGroupChat() {
  const { isOpen: isInfoOpen, toggle: toggleInfo } = useToggle();
  const { id } = useParams();
  const { data: groupChatDetail, loading } = useFetch(
    useCallback(() => ChatGroupService.getGroupChatById(id), [id])
  );
  const {
    isOpen: isMobileInfoOpen,
    toggle: toggleMobileInfo,
    close: closeMobileInfo,
  } = useToggle();

  console.log("groupChatDetail: ", groupChatDetail);

  if (loading) return null;

  return (
    <>
      {isMobileInfoOpen && (
        <Info
          userInfo={{
            avatarUrl: groupChatDetail?.avatarUrl,
            nickName: groupChatDetail?.groupName,
            isOnline: false,
          }}
          closeInfoMobile={closeMobileInfo}
        />
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
                src={groupChatDetail?.avatarUrl}
                alt=""
              />
              <span className={styles.dot}></span>
            </div>
            <div className="truncate">
              <p className={styles.name}>{groupChatDetail?.groupName}</p>
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
        <GroupChat groupChatDetail={groupChatDetail} />
      </div>
      {isInfoOpen && (
        <Info
          userInfo={{
            avatarUrl: groupChatDetail?.avatarUrl,
            nickName: groupChatDetail?.groupName,
            isOnline: false,
          }}
          closeInfoMobile={closeMobileInfo}
        />
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
