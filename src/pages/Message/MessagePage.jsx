import MessageSideBar from "../../components/Message/MessageSideBar/MessageSideBar";
import styles from "./MessagePage.module.css";
import useFetchConversations from "../../hooks/useFetchConversations";
import SpinningContainer from "../../components/common/SpinningContainer";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";

export default function MessagePage() {
  const { id } = useParams();
  const { conversations, loading, isLoadingPending, pendingConversations } =
    useFetchConversations();
  const navigate = useNavigate();

  useEffect(() => {
    if (
      !id &&
      typeof id === "number" &&
      conversations &&
      conversations.length > 0
    ) {
      navigate(`/message/${conversations[0].id}`);
    }
  }, [id, conversations, navigate]);

  if (loading) {
    return <SpinningContainer />;
  }

  return (
    <div className={styles.container}>
      <MessageSideBar
        loading={loading}
        conversations={conversations}
        pendingConversations={pendingConversations}
        isLoadingPending={isLoadingPending}
      />
      <Outlet context={{ conversations }} />
      {/* <MessageDetail conversations={conversations} /> */}
    </div>
  );
}
