import MessageInput from "../MessageInput/MessageInput";
import styles from "./Chats.module.css";
import MessageItem from "./MessageItem/MessageItem";
import SpinningContainer from "../../../common/SpinningContainer";
import PropTypes from "prop-types";
import useFetchMessages from "../../../../hooks/useFetchMessages";
import { MessageService } from "../../../../services/message.service";
import { useParams } from "react-router-dom";

export default function Chats({ otherUser }) {
  const { id } = useParams();
  const { loading, isFetchingMore, chatListRef, messageData, setMessageData } =
    useFetchMessages({ collectionPath: "conversations", conversationId: id });

  return (
    <>
      {loading && (
        <div className="flex items-end">
          <SpinningContainer />
        </div>
      )}
      <div className={`${styles.wrapper} ${loading ? "opacity-0" : ""}`}>
        <ul className={"w-full overflow-y-scroll mt-3"} ref={chatListRef}>
          {isFetchingMore && <SpinningContainer />}
          {messageData
            ?.map((chat) => {
              return <MessageItem key={chat.id} messageData={chat} />;
            })
            .reverse()}
        </ul>
        <MessageInput
          receiverId={otherUser.userId}
          setMessageData={setMessageData}
          apiCall={MessageService.sendMessageToUser}
          ref={chatListRef}
        />
      </div>
    </>
  );
}

Chats.propTypes = {
  otherUser: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    userId: PropTypes.string.isRequired,

    otherUser: PropTypes.shape({
      avatarUrl: PropTypes.string.isRequired,
      nickname: PropTypes.string.isRequired,
      otherUser: PropTypes.object,
    }),
  }),
};
