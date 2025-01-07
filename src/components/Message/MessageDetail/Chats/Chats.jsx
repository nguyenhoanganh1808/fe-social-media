import MessageInput from "../MessageInput/MessageInput";
import styles from "./Chats.module.css";
import MessageItem from "./MessageItem/MessageItem";
import SpinningContainer from "../../../common/SpinningContainer";
import PropTypes from "prop-types";
import useFetchMessages from "../../../../hooks/useFetchMessages";

export default function Chats({ otherUser }) {
  const { loading, isFetchingMore, chatListRef, messageData, setMessageData } =
    useFetchMessages();

  if (loading) {
    return (
      <div className="flex items-end">
        <SpinningContainer />;
      </div>
    );
  }

  return (
    <div className={`${styles.wrapper}`}>
      <ul className="w-full overflow-y-scroll mt-3" ref={chatListRef}>
        {isFetchingMore && <SpinningContainer />}
        {messageData
          ?.map((chat) => {
            return <MessageItem key={chat.id} messageData={chat} />;
          })
          .reverse()}
      </ul>
      <MessageInput receiverId={otherUser.id} setMessageData={setMessageData} />
      ;
    </div>
  );
}

Chats.propTypes = {
  otherUser: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    otherUser: PropTypes.shape({
      id: PropTypes.string.isRequired,
      avatarUrl: PropTypes.string.isRequired,
      nickname: PropTypes.string.isRequired,
      otherUser: PropTypes.object,
    }).isRequired,
  }),
};
