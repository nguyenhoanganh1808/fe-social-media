import PropTypes from "prop-types";
import styles from "./ListGroupItem.module.css";
import { ChevronDownIcon } from "lucide-react";

export default function ListGroupItem({ listItemData }) {
  return (
    <div className={styles.container}>
      <h5 className={styles.title}>{listItemData.title}</h5>
      <ChevronDownIcon />
    </div>
  );
}

ListGroupItem.propTypes = {
  listItemData: PropTypes.shape({
    title: PropTypes.string.isRequired,
  }),
};
