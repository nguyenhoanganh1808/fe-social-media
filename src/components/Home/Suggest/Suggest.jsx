import { useState } from "react";
import styles from "./Suggest.module.css";
import SuggestRequestCard from "./SuggestRequestCard/SuggestRequestCard";

export default function Suggest() {
  const [activeTab, setActiveTab] = useState("suggests");
  const datas = [
    {
      id: 0,
      name: "Hai Son Bac",
      link: "@michel",
      avatarUrl:
        "https://cdn.tuoitre.vn/zoom/700_700/2019/5/8/avatar-publicitystill-h2019-1557284559744252594756-crop-15572850428231644565436.jpg",
    },
    {
      id: 1,
      name: "Bach Nhan",
      link: "@michel",
      avatarUrl:
        "https://cdn.tuoitre.vn/zoom/700_700/2019/5/8/avatar-publicitystill-h2019-1557284559744252594756-crop-15572850428231644565436.jpg",
    },
    {
      id: 2,
      name: "Michel",
      link: "@michel",
      avatarUrl:
        "https://cdn.tuoitre.vn/zoom/700_700/2019/5/8/avatar-publicitystill-h2019-1557284559744252594756-crop-15572850428231644565436.jpg",
    },
  ];

  return (
    <div className={styles.wrapper}>
      <div className={styles.tabContainer}>
        <button
          className={`${styles.tabButton} ${
            activeTab === "suggests" ? styles.active : ""
          }`}
          onClick={() => setActiveTab("suggests")}
        >
          SUGGESTS
        </button>
        <button
          className={`${styles.tabButton} ${
            activeTab === "requests" ? styles.active : ""
          }`}
          onClick={() => setActiveTab("requests")}
        >
          REQUESTS
        </button>
      </div>
      <ul className={styles.container}>
        {datas.map((data) => (
          <SuggestRequestCard key={data.id} person={data} />
        ))}
      </ul>
      <a className={styles.showMore} href="">
        Show more
      </a>
    </div>
  );
}
