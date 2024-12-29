import { NavLink, useParams } from "react-router-dom";
import styles from "./NavBar.module.css";

export default function NavBar() {
  const { id } = useParams();
  const data = [
    {
      title: "Post",
      href: `/profile/${id}`,
    },
    {
      title: "About",
      href: `/profile/${id}/about`,
    },
    {
      title: "Saved",
      href: `/profile/${id}/saved`,
    },
    {
      title: "Photos",
      href: `/profile/${id}/photos`,
    },
    {
      title: "Videos",
      href: `/profile/${id}/videos`,
    },
    {
      title: "More",
      href: `/profile/${id}/more`,
    },
  ];
  return (
    <div className={styles.wrapper}>
      <ul className={styles.container}>
        {data.map((navitem) => (
          <li className={styles.item} key={navitem.title}>
            <NavLink
              className={({ isActive }) =>
                isActive && navitem.href !== `/profile/${id}`
                  ? "text-purple-500"
                  : ""
              }
              to={navitem.href}
            >
              {navitem.title}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
}
