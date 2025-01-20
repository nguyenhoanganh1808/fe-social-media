import styles from "../MessageDetail/Chats/Chats.module.css";
import MessageInput from "../MessageDetail/MessageInput/MessageInput";
import MessageItem from "../MessageDetail/Chats/MessageItem/MessageItem";
import SpinningContainer from "../../common/SpinningContainer";
import useFetchMessages from "../../../hooks/useFetchMessages";
import { useParams } from "react-router-dom";
import { MessageService } from "../../../services/message.service";

export default function GroupChat() {
  const { id } = useParams();

  const { loading, isFetchingMore, chatListRef, messageData, setMessageData } =
    useFetchMessages({
      collectionPath: "chat_groups",
      conversationId: id,
    });

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
          receiverId={id}
          setMessageData={setMessageData}
          apiCall={MessageService.sendMessageToGroup}
          ref={chatListRef}
        />
      </div>
    </>
  );
}
