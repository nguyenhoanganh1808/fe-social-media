import ChatItem from "./ChatItem/ChatItem";
import PropTypes from "prop-types";

export default function ChatList({ conversations }) {
  return (
    <div>
      <ul>
        {conversations.map((conversation) => {
          return <ChatItem key={conversation.id} conversation={conversation} />;
        })}
      </ul>
    </div>
  );
}

ChatList.propTypes = {
  conversations: PropTypes.any,
};
