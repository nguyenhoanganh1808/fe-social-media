import { LucideEdit2 } from "lucide-react";
import styles from "./EditButton.module.css";
import PropTypes from "prop-types";

export default function EditButton({ children, onClick }) {
  return (
    <button onClick={onClick} className={styles.container}>
      <p>{children}</p>
      <LucideEdit2 />
    </button>
  );
}

EditButton.propTypes = {
  children: PropTypes.node,
  onClick: PropTypes.func,
};
