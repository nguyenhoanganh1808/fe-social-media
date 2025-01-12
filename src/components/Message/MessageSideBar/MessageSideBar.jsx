import styles from "./MessageSideBar.module.css";
import { Menu, PenBoxIcon } from "lucide-react";
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
  const { isOpen: isOpenDropdown, toggle: toggleDropdown } = useToggle();
  let sidebarItems;

  if (activeTab === "Primary") {
    sidebarItems = conversations;
  } else if (activeTab === "Group") {
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
        <h4 className="truncate">Messages</h4>
        <FormCreateGroupChatModal isOpenModal={isOpen} onCloseModal={close} />
        <PenBoxIcon className="hidden md:block" onClick={open} size={30} />
      </div>

      <input
        className={styles.input}
        type="search"
        placeholder="Search Messages"
      />

      <div className={`${styles.titleWrapper}`}>
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
      <div className="flex justify-center rounded-full hover:cursor-pointer relative">
        <Menu className="md:hidden block" onClick={toggleDropdown} size={20} />
        {isOpenDropdown && (
          <div
            id="dropdown"
            className="z-10 absolute left-16 top-0 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
          >
            <ul
              className="py-2 text-sm text-gray-700 dark:text-gray-200"
              aria-labelledby="dropdownDefaultButton"
            >
              {data.map((type, index) => {
                const isActive = activeTab === type.title;

                return (
                  <div
                    onClick={() => setActiveTab(type.title)}
                    key={index}
                    className={isActive ? "bg-blue-200" : ""}
                  >
                    <div className="relative">
                      <span className="sr-only">Notifications</span>
                      <li>
                        <a
                          href="#"
                          className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                        >
                          {type.title}
                        </a>
                      </li>
                    </div>
                  </div>
                );
              })}
            </ul>
          </div>
        )}
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
