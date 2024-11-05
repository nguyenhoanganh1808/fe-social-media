import ActiveItem from "./ActiveItem/ActiveItem";
import styles from "./ActiveFriendsList.module.css";

export default function ActiveFriendList() {
  const datas = [
    {
      id: 0,
      name: "Hai Son Bac",
      link: "@michel",
      isOnline: false,
      avatarUrl:
        "https://cdn.tuoitre.vn/zoom/700_700/2019/5/8/avatar-publicitystill-h2019-1557284559744252594756-crop-15572850428231644565436.jpg",
    },
    {
      id: 1,
      name: "Bach Nhan",
      link: "@michel",
      isOnline: true,

      avatarUrl:
        "https://cdn.tuoitre.vn/zoom/700_700/2019/5/8/avatar-publicitystill-h2019-1557284559744252594756-crop-15572850428231644565436.jpg",
    },
    {
      id: 2,
      name: "Michel",
      isOnline: false,
      link: "@michel",
      avatarUrl:
        "https://cdn.tuoitre.vn/zoom/700_700/2019/5/8/avatar-publicitystill-h2019-1557284559744252594756-crop-15572850428231644565436.jpg",
    },
  ];
  return (
    <div className={styles.container}>
      <h1 className={styles.header}>Active</h1>
      <ul className={styles.listContainer}>
        {datas.map((data) => (
          <ActiveItem key={data.id} person={data} />
        ))}
      </ul>
    </div>
  );
}
