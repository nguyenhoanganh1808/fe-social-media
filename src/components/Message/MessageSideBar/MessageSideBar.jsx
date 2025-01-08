import styles from "./MessageSideBar.module.css";
import { PenBoxIcon } from "lucide-react";
import data from "../data";
import { useState } from "react";
import ChatList from "./ChatsList/ChatsList";
import PropTypes from "prop-types";
import SpinningContainer from "../../common/SpinningContainer";
import useToggle from "../../../hooks/useToggle";
import FormCreateGroupChatModal from "./FormCreateGroupChatModal";

export default function MessageSideBar({
  conversations,
  loading,
  pendingConversations,
}) {
  const [activeTab, setActiveTab] = useState("Primary");
  const { close, isOpen, open } = useToggle();
  let sidebarItems;

  if (activeTab === "Primary") {
    sidebarItems = conversations;
  } else if (activeTab === "General") {
    sidebarItems = [];
  } else {
    sidebarItems = pendingConversations;
  }
  if (loading) {
    return <SpinningContainer />;
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h4>Messages</h4>
        <FormCreateGroupChatModal isOpenModal={isOpen} onCloseModal={close} />
        <PenBoxIcon onClick={open} size={30} />
      </div>

      <input
        className={styles.input}
        type="search"
        placeholder="Search Messages"
      />

      <div className={styles.titleWrapper}>
        {data.map((type, index) => {
          const isActive = activeTab === type.title;
          const numNoti =
            type.title === "Request" ? pendingConversations.length : 0;
          return (
            <div
              onClick={() => setActiveTab(type.title)}
              key={index}
              className={`${styles.titleContainer} ${
                isActive ? styles.titleActive : ""
              } `}
            >
              <div className="relative">
                <span className="sr-only">Notifications</span>
                {numNoti > 0 && (
                  <div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full -top-2 -end-1 dark:border-gray-900">
                    {numNoti}
                  </div>
                )}
                <h4>{type.title}</h4>
              </div>
            </div>
          );
        })}
      </div>

      <ChatList activeTab={activeTab} data={sidebarItems} />
    </div>
  );
}

MessageSideBar.propTypes = {
  conversations: PropTypes.any,
  pendingConversations: PropTypes.any,
  loading: PropTypes.bool.isRequired,
};
