import FlyOut from "../FlyOut/FlyOut";
import styles from "./FlyOutMenu.module.css";
import { Link } from "react-router-dom";

export default function FlyOutMenu() {
  return (
    <FlyOut>
      <div className={styles.container}>
        <FlyOut.Toggle />
        <FlyOut.List>
          <FlyOut.Item>
            <Link to="/profile/1">View your profile</Link>
          </FlyOut.Item>
        </FlyOut.List>
      </div>
    </FlyOut>
  );
}
