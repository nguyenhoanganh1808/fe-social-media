import styles from "./Tab.module.css";
import { useState } from "react";
import { Book, Mail, Home } from "lucide-react";
import HomePage from "../../../pages/Home/HomePage";
import { Link, NavLink } from "react-router-dom";

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

export default function Tab() {
  return (
    <nav className={styles.container}>
      {TabData.map((Tab, index) => {
        return (
          <div key={index}>
            <NavLink
              className={({ isActive, isPending }) =>
                isActive ? styles.active : isPending ? styles.pending : ""
              }
              to={Tab.path}
            >
              <Tab.icon className={styles.icon} size={50} />
            </NavLink>
          </div>
        );
      })}
    </nav>
  );
}
