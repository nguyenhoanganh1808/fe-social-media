import { useState } from "react";
import styles from "./Suggest.module.css";
import SuggestRequestCard from "./SuggestRequestCard/SuggestRequestCard";
import { FollowService } from "../../../services/follow.service";
import useFetch from "../../../hooks/useFetch";
import SpinningContainer from "../../common/SpinningContainer";
import { createUserProfile } from "../../../lib/utils";

export default function Suggest() {
  const { data: users, loading } = useFetch(FollowService.getFollowRequests);
  const [activeTab, setActiveTab] = useState("suggests");

  if (loading || !users) return <SpinningContainer />;

  if (users && users.length === 0) {
    return null;
  }

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
        {users.map((user) => (
          <SuggestRequestCard
            key={user.id}
            followerId={user.id}
            person={createUserProfile(user.follower)}
            activeTab={activeTab}
          />
        ))}
      </ul>
      <a className={styles.showMore} href="">
        Show more
      </a>
    </div>
  );
}
