import styles from "./Tab.module.css";
import { Book, Mail, Home } from "lucide-react";

import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";

const TabData = [
  {
    icon: Home,
    label: "Home",
    path: "/posts",
  },
  {
    icon: Mail,

    label: "Message",
    path: "/message",
  },
  {
    icon: Book,

    label: "Edu",
    path: "/edu",
  },
];

export default function Tab() {
  return (
    <nav className={styles.nav}>
      <ul className={styles.container}>
        {TabData.map((Tab, index) => {
          return (
            <li key={index} className={styles.li}>
              <NavLink
                className={({ isActive }) => (isActive ? styles.selected : "")}
                to={Tab.path}
              >
                {({ isActive }) => (
                  <>
                    <div className={styles.iconContainer}>
                      <Tab.icon className={styles.icon} size={40} />
                      <p>{Tab.label}</p>
                    </div>
                    {isActive && (
                      <motion.div
                        className={styles.underline}
                        layoutId="underline"
                      />
                    )}
                  </>
                )}
              </NavLink>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
