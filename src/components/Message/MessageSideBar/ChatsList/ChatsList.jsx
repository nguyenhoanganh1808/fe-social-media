import data from "../../data";
import ChatItem from "./ChatItem/ChatItem";

export default function ChatList() {
  return (
    <div>
      <ul>
        {data[1].chats.map((chat, index) => {
          return <ChatItem key={index} chatData={chat} />;
        })}
      </ul>
    </div>
  );
}
