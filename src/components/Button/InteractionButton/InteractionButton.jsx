import { nFormatter } from "../../../lib/utils";
import styles from "./InteractionButton.module.css";
import PropTypes from "prop-types";

function InteractionButton({ icon, count }) {
  return (
    <button className={styles.container}>
      {icon}
      {count && <p className={styles.count}>{nFormatter(count, 1)}</p>}
    </button>
  );
}

InteractionButton.propTypes = {
  icon: PropTypes.node.isRequired,
  count: PropTypes.number,
};

export default InteractionButton;
