import styles from "./Communities.module.css";

export default function Communities() {
  const datas = [
    {
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCy70vlO2WmaZP4m9EhyjwqW7EaE7OQeOz5w&s",
      name: "UX Designer communitiy",
      friends: 32,
    },
    {
      img: "https://cdn.iconscout.com/icon/free/png-256/free-react-logo-icon-download-in-svg-png-gif-file-formats--company-brand-world-logos-vol-4-pack-icons-282599.png?f=webp&w=256",
      name: "Front end developers",
      friends: 25,
    },
    {
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0ZY7pSp8vUlxBODPl3S4YYzsx0Ht-sB7EkQ&s",
      name: "Back end developers",
      friends: 28,
    },
  ];
  return (
    <div className={styles.wrapper}>
      <h1 className={styles.header}>Communities</h1>
      <ul className={styles.communitiesList}>
        {datas.map((community) => (
          <div className={styles.container} key={community.name}>
            <img
              className={styles.communityImage}
              src={community.img}
              alt={community.name}
            />
            <div>
              <p className={styles.communityName}>{community.name}</p>
              <p className={styles.friendsIn}>
                {community.friends} your friends are in
              </p>
            </div>
          </div>
        ))}
      </ul>
    </div>
  );
}
