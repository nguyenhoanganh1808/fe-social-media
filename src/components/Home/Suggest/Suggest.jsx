import styles from "./Suggest.module.css";
import SuggestRequestCard from "./SuggestRequestCard/SuggestRequestCard";

export default function Suggest() {
  const datas = [
    {
      name: "Michel",
      link: "@michel",
      avatarUrl:
        "https://cdn.tuoitre.vn/zoom/700_700/2019/5/8/avatar-publicitystill-h2019-1557284559744252594756-crop-15572850428231644565436.jpg",
    },
    {
      name: "Michel",
      link: "@michel",
      avatarUrl:
        "https://cdn.tuoitre.vn/zoom/700_700/2019/5/8/avatar-publicitystill-h2019-1557284559744252594756-crop-15572850428231644565436.jpg",
    },
    {
      name: "Michel",
      link: "@michel",
      avatarUrl:
        "https://cdn.tuoitre.vn/zoom/700_700/2019/5/8/avatar-publicitystill-h2019-1557284559744252594756-crop-15572850428231644565436.jpg",
    },
  ];
  return (
    <div className={styles.container}>
      {datas.map((data) => (
        <SuggestRequestCard key={data.avatarUrl} person={data} />
      ))}
    </div>
  );
}
