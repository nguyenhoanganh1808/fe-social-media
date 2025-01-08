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
  const otherUser = conversation.otherUser;
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
    if (result.success) {
      navigate(`/message/${conversation.id}`);
    }
    setLoading(false);
  };

  const author =
    conversation.lastMessage.senderId.id === user.userId
      ? "You"
      : conversation.lastMessage.senderId.nickname;

  return (
    <NavLink
      className={({ isActive }) =>
        `${styles.container} ${isActive ? "bg-blue-100" : ""}`
      }
      to={`/message/${conversation.id}`}
    >
      <div className={styles.avatarContainer}>
        <img className={styles.avatar} src={otherUser.avatarUrl} alt="" />
        {<span className={styles.dot}></span>}
      </div>
      <div className="md:block hidden">
        <span className="font-semibold text-black">{otherUser.nickname}</span>
        <p className={styles.chat}>
          <strong>{author}: </strong> {conversation.lastMessage.content} -{" "}
          {createdAt}
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
    }),

    lastMessage: PropTypes.shape({
      content: PropTypes.string,
      createdAt: PropTypes.string.isRequired,
      senderId: PropTypes.shape({
        id: PropTypes.string.isRequired,
        avatarUrl: PropTypes.string,
        isOnline: PropTypes.bool,
        nickname: PropTypes.string.isRequired,
      }),
    }),
  }),
  activeTab: PropTypes.string.isRequired,
};
