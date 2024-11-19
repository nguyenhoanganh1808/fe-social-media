import styles from "./Tab.module.css";
import { useState } from "react";
import { Book, Mail, Home } from "lucide-react";
import HomePage from "../../../pages/Home/HomePage";
import { Link } from "react-router-dom";

export default function Tab() {
  const [activeTab, setActiveTab] = useState("Home");

  const TabData = [
    {
      icon: Home,
      view: HomePage(),
      label: "Home",
      path: "/home",
    },
    {
      icon: Mail,
      view: HomePage(),
      label: "Message",
      path: "/message",
    },
    {
      icon: Book,
      view: HomePage(),
      label: "Edu",
      path: "/edu",
    },
  ];

  return (
    <div className={styles.container}>
      {TabData.map((Tab, index) => {
        const isActive = activeTab === Tab.label;
        return (
          <div key={index}>
            <Link
              color={isActive ? styles.linkActive : styles.link}
              to={Tab.path}
            >
              <Tab.icon
                onClick={() => setActiveTab(Tab.label)}
                className={styles.icon}
                size={50}
                fill={isActive ? "#38bdf8" : "#DBEAEE"}
              />
              <hr className={isActive ? styles.active : ""} />
            </Link>
          </div>
        );
      })}
    </div>
  );
}
