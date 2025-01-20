import { NavLink } from "react-router-dom";
import useFethcInfinityData from "../../../../hooks/useFetchInfinityData";
import { ChatGroupService } from "../../../../services/chat-group.service";
import styles from "./ChatItem/ChatItem.module.css";
import { useAuth } from "../../../../hooks/useAuthContext";
import { formatRelativeTime } from "../../../../lib/utils";
export default function ChatGroupList() {
  const { data, container } = useFethcInfinityData(
    ChatGroupService.getChatGroup
  );
  const { user } = useAuth();
  console.log("data: ", data);
  return (
    <div>
      <ul ref={container}>
        {data.map((conversation) => {
          console.log("conver: ", conversation);
          // const author =
          //   conversation.lastMessage?.senderId.id === user.userId
          //     ? "You"
          //     : conversation.lastMessage?.senderId.nickname;
          const author = "You";
          const createdAt = formatRelativeTime(
            conversation.lastMessage?.createdAt
          );

          return (
            <NavLink
              key={conversation.id}
              className={({ isActive }) =>
                `${styles.container} ${isActive ? "bg-blue-100" : ""}`
              }
              to={`/message/group-chat/${conversation.id}`}
            >
              <div className={styles.avatarContainer}>
                <img
                  className={styles.avatar}
                  src={conversation.avatarUrl}
                  alt=""
                />
                {<span className={styles.dot}></span>}
              </div>
              <div className="md:block hidden">
                <span className="font-semibold text-black">
                  {conversation.groupName}
                </span>
                <p className={styles.chat}>
                  <strong>{author}: </strong>{" "}
                  {conversation.lastMessage?.content} - {createdAt}
                </p>
              </div>
            </NavLink>
          );
        })}
      </ul>
    </div>
  );
}
