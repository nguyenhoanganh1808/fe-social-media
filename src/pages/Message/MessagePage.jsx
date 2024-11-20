import MessageDetail from "../../components/Message/MessageDetail/MessageDetail";
import MessageSideBar from "../../components/Message/MessageSideBar/MessageSideBar";
import styles from "./MessagePage.module.css";

export default function MessagePage() {
  return (
    <div className={styles.container}>
      <MessageSideBar />
      <MessageDetail />
    </div>
  );
}
