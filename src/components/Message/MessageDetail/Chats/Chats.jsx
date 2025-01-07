import { useEffect, useState } from "react";
import MessageInput from "../MessageInput/MessageInput";
import styles from "./Chats.module.css";
import MessageItem from "./MessageItem/MessageItem";
import { MessageService } from "../../../../services/message.service";
import { useParams } from "react-router-dom";
import SpinningContainer from "../../../common/SpinningContainer";

export default function Chats() {
  const [messageData, setMessageData] = useState(null);
  const [loading, setLoading] = useState(false);

  const { id } = useParams();

  useEffect(() => {
    async function fetch() {
      setLoading(true);
      const result = await MessageService.getMessage(id, 0, 10);
      if (result.success) {
        setMessageData(result.data);
      }
      setLoading(false);
    }
    fetch();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-end">
        <SpinningContainer />;
      </div>
    );
  }

  return (
    <div className={`${styles.wrapper}`}>
      {messageData?.map((chat) => {
        return <MessageItem key={chat.id} messageData={chat} />;
      })}
      <MessageInput />
    </div>
  );
}
