import ChatItem from "./ChatItem/ChatItem";
import PropTypes from "prop-types";

export default function ChatList({ data, activeTab }) {
  return (
    <div>
      <ul>
        {data.map((conversation) => {
          return (
            <ChatItem
              key={conversation.id}
              conversation={conversation}
              activeTab={activeTab}
            />
          );
        })}
      </ul>
    </div>
  );
}

ChatList.propTypes = {
  data: PropTypes.any,
  activeTab: PropTypes.string.isRequired,
};
