import MessageSideBar from "../../components/Message/MessageSideBar/MessageSideBar";
import MessageDetail from "../../components/Message/MessageDetail/MessageDetail";
import styles from "./MessagePage.module.css";
import useFetchConversations from "../../hooks/useFetchConversations";
import SpinningContainer from "../../components/common/SpinningContainer";

export default function MessagePage() {
  const { conversations, loading } = useFetchConversations();

  if (loading || conversations.length === 0) return <SpinningContainer />;

  return (
    <div className={styles.container}>
      <MessageSideBar loading={loading} conversations={conversations} />
      <MessageDetail loding={loading} conversations={conversations} />
    </div>
  );
}
