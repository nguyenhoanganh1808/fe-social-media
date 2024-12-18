import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import styles from "./Item.module.css";

export default function Item({ data }) {
  return (
    <li>
      <NavLink
        className={`${({ isActive }) => (isActive ? styles.active : "")} ${
          styles.container
        }`}
        to={data.href}
      >
        <p>{data.title}</p>
        <img src={data.iconSrc} alt="Icon" />
      </NavLink>
    </li>
  );
}

Item.propTypes = {
  data: PropTypes.shape({
    title: PropTypes.string.isRequired,
    href: PropTypes.string.isRequired,
    iconSrc: PropTypes.string.isRequired,
  }),
};
