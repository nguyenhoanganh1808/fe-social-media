import { NavLink, useNavigate } from "react-router-dom";
import styles from "./ChatItem.module.css";
import PropTypes from "prop-types";
import LucideCircleButton from "../../../../Button/LucideCircleButton/LucideCircleButton";
import { Check, X } from "lucide-react";
import { Tooltip } from "flowbite-react";
import { MessageService } from "../../../../../services/message.service";
import { useState } from "react";
import Spinner from "../../../../common/Spinner/Spinner";
import { useAuth } from "../../../../../hooks/useAuthContext";
import { formatRelativeTime } from "../../../../../lib/utils";

export default function ChatItem({ conversation, activeTab }) {
  const otherUser =
    conversation.otherUser.student || conversation.otherUser.lecturer;
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();
  const createdAt = formatRelativeTime(conversation.lastMessage.createdAt);

  const handleApprove = async (value) => {
    setLoading(true);
    const result = await MessageService.approveConversation(
      value,
      conversation.id
    );
    // if (result.success) {
    //   navigate(`/message/${conversation.id}`);
    // }
    setLoading(false);
  };
  console.log("conver: ", conversation);
  console.log("author: ", otherUser);
  const author =
    conversation.lastMessage.senderId.id === user.userId
      ? "You"
      : conversation.lastMessage.senderId.student.profile.nickName ||
        conversation.lastMessage.senderId.lecturer.profile.nickName;
  return (
    <NavLink
      className={({ isActive }) =>
        `${styles.container} ${isActive ? "bg-blue-100" : ""}`
      }
      to={`/message/${conversation.id}`}
    >
      <div className={styles.avatarContainer}>
        <img
          className={styles.avatar}
          src={otherUser.profile.avatarUrl}
          alt=""
        />
        {<span className={styles.dot}></span>}
      </div>
      <div className="md:block hidden truncate">
        <span className="font-semibold text-black">
          {otherUser.profile.nickName}
        </span>
        <p className={`${styles.chat} truncate max-w-1`}>
          <strong>{author}: </strong> {conversation.lastMessage.content} -{" "}
          <span>{createdAt}</span>
        </p>
      </div>
      {activeTab === "Request" && (
        <div className="ml-auto flex gap-3">
          {loading ? (
            <Spinner borderWidth={3} />
          ) : (
            <>
              <Tooltip content="Denied message from this user">
                <LucideCircleButton
                  onClick={() => handleApprove(false)}
                  size={30}
                  color="red"
                >
                  <X />
                </LucideCircleButton>
              </Tooltip>
              <Tooltip content="Approve this message">
                <LucideCircleButton
                  onClick={() => handleApprove(true)}
                  size={30}
                >
                  <Check />
                </LucideCircleButton>
              </Tooltip>
            </>
          )}
        </div>
      )}
    </NavLink>
  );
}

ChatItem.propTypes = {
  conversation: PropTypes.shape({
    id: PropTypes.number.isRequired,
    otherUser: PropTypes.shape({
      id: PropTypes.string.isRequired,
      avatarUrl: PropTypes.string.isRequired,
      nickname: PropTypes.string.isRequired,
      student: PropTypes.object,
      lecturer: PropTypes.object,
    }),

    lastMessage: PropTypes.shape({
      content: PropTypes.string,
      createdAt: PropTypes.string.isRequired,
      senderId: PropTypes.shape({
        id: PropTypes.string.isRequired,
        avatarUrl: PropTypes.string,
        isOnline: PropTypes.bool,
        nickname: PropTypes.string.isRequired,
        student: PropTypes.object,
        lecturer: PropTypes.object,
      }),
    }),
  }),
  activeTab: PropTypes.string.isRequired,
};
