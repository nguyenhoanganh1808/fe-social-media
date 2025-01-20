import PropTypes from "prop-types";
import styles from "./ListGroupItem.module.css";
import { ChevronDownIcon } from "lucide-react";

export default function ListGroupItem({ listItemData, children }) {
  return (
    <>
      <div className={styles.container}>
        <h5 className={styles.title}>{listItemData.title}</h5>
        <ChevronDownIcon />
      </div>
      <div>{children}</div>
    </>
  );
}

ListGroupItem.propTypes = {
  listItemData: PropTypes.shape({
    title: PropTypes.string.isRequired,
  }),
  children: PropTypes.node.isRequired,
};
