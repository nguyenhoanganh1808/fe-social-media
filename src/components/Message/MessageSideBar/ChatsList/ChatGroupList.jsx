import { NavLink, useRouteLoaderData } from "react-router-dom";
import useFethcInfinityData from "../../../../hooks/useFetchInfinityData";
import { ChatGroupService } from "../../../../services/chat-group.service";
import styles from "./ChatItem/ChatItem.module.css";
import { useAuth } from "../../../../hooks/useAuthContext";
import { createUserProfile, formatRelativeTime } from "../../../../lib/utils";
export default function ChatGroupList() {
  const { data, container } = useFethcInfinityData(
    ChatGroupService.getChatGroup
  );

  const { user } = useAuth();

  return (
    <div>
      <ul ref={container}>
        {data.map((conversation) => {
          console.log("conver: ", conversation);
          let displayAuthor = "";
          if (conversation.lastMessageSender) {
            const author = createUserProfile(conversation.lastMessageSender);
            displayAuthor = author.id === user.userId ? "You" : author.nickName;
          }

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
                  <strong>{displayAuthor}: </strong>{" "}
                  {conversation.lastMessage ? conversation.lastMessage : ""}
                </p>
              </div>
            </NavLink>
          );
        })}
      </ul>
    </div>
  );
}
