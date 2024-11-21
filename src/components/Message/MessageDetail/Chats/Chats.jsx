import MessageInput from "../MessageInput/MessageInput";
import styles from "./Chats.module.css";
import MessageItem from "./MessageItem/MessageItem";

export default function Chats() {
  const data = [
    {
      id: 1,
      user: {
        name: "John Doe",
        avatarUrl: "https://example.com/avatar1.jpg",
      },
      lastMessage: "Hey, how's it going?",
      timestamp: "10:30 AM",
    },
    {
      id: 2,
      user: {
        name: "Jane Smith",
        avatarUrl: "https://example.com/avatar2.jpg",
      },
      lastMessage: "Can we reschedule our meeting?",
      timestamp: "9:15 AM",
    },
    {
      id: 3,
      user: {
        name: "Michael Brown",
        avatarUrl: "https://example.com/avatar3.jpg",
      },
      lastMessage: "Thanks for the help earlier!",
      timestamp: "Yesterday",
    },
  ];
  return (
    <div className={styles.wrapper}>
      {data.map((chat) => {
        return <MessageItem key={chat.id} messageData={chat} />;
      })}
      <MessageInput />
    </div>
  );
}
