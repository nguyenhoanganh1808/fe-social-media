import { ChevronDown } from "lucide-react";
import styles from "./Avatar.module.css";
import { useAuth } from "../../../hooks/useAuthContext";

export default function Avatar() {
  const { user } = useAuth();
  return (
    <div className={styles.container}>
      <Avatar />
      <img className={styles.avatar} src={user.avatarUrl} alt="User avatar" />
      <p>{user.nickName}</p>
      <ChevronDown color="#DBEAEE" size={30} />
    </div>
  );
}
