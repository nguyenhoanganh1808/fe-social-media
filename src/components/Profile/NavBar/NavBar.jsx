import styles from "./NavBar.module.css";

export default function NavBar() {
  const data = [
    {
      title: "Post",
    },
    {
      title: "About",
    },
    {
      title: "Saved",
    },
    {
      title: "Photos",
    },
    {
      title: "Videos",
    },
    {
      title: "More",
    },
  ];
  return (
    <div className={styles.wrapper}>
      <ul className={styles.container}>
        {data.map((navitem) => (
          <li className={styles.item} key={navitem.title}>
            {navitem.title}
          </li>
        ))}
      </ul>
    </div>
  );
}
