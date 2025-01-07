import MessageSideBar from "../../components/Message/MessageSideBar/MessageSideBar";
import MessageDetail from "../../components/Message/MessageDetail/MessageDetail";
import styles from "./MessagePage.module.css";
import useFetchConversations from "../../hooks/useFetchConversations";
import SpinningContainer from "../../components/common/SpinningContainer";

export default function MessagePage() {
  const { conversations, loading, isLoadingPending, pendingConversations } =
    useFetchConversations();

  if (loading || conversations[0] == null) return <SpinningContainer />;

  return (
    <div className={styles.container}>
      <MessageSideBar
        loading={loading}
        conversations={conversations}
        pendingConversations={pendingConversations}
        isLoadingPending={isLoadingPending}
      />
      <MessageDetail loding={loading} conversations={conversations} />
    </div>
  );
}
