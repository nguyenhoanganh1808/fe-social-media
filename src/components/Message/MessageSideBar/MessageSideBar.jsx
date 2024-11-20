import styles from "./MessageSideBar.module.css";
import { PenBoxIcon } from "lucide-react";
import data from "../data";
import { useState } from "react";
import ChatList from "./ChatsList/ChatsList";

export default function MessageSideBar() {
  const [activeTab, setActiveTab] = useState("Primary");
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h4>Messages</h4>
        <PenBoxIcon size={30} />
      </div>

      <input
        className={styles.input}
        type="search"
        placeholder="Search Messages"
      />

      <div className={styles.titleWrapper}>
        {data.map((type, index) => {
          const isActive = activeTab === type.title;
          return (
            <div
              onClick={() => setActiveTab(type.title)}
              key={index}
              className={`${styles.titleContainer} ${
                isActive ? styles.titleActive : ""
              } `}
            >
              <h4>{type.title}</h4>
            </div>
          );
        })}
      </div>

      <ChatList />
    </div>
  );
}
