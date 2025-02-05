import PropTypes from "prop-types";
import styles from "./SuggestRequestCard.module.css";
import { FollowService } from "../../../../services/follow.service";
import { useState } from "react";

function SuggestRequestCard({ person, activeTab, followerId }) {
  const [isFollowing, setIsFollowing] = useState(false);
  const handleAccept = async () => {
    setIsFollowing(true);
    const result = await FollowService.respondFollow(followerId, "ACCEPTED");
    if (result.error) {
      setIsFollowing(false);
    }
  };
  return (
    <div className={styles.container}>
      <div className={styles.avatarAndName}>
        <img
          className={styles.avatar}
          src={person.avatarUrl}
          alt={person.nickName}
        />
        <div>
          <p className={styles.name}>{person.nickName}</p>
          <p className={styles.link}>{person.tagName}</p>
        </div>
      </div>
      <button onClick={handleAccept} className={styles.followButton}>
        {isFollowing
          ? "Following"
          : activeTab === "suggests"
          ? "Follow"
          : "Follow"}
      </button>
    </div>
  );
}

SuggestRequestCard.propTypes = {
  followerId: PropTypes.number.isRequired,
  person: PropTypes.shape({
    nickName: PropTypes.string.isRequired,
    avatarUrl: PropTypes.string.isRequired,
    tagName: PropTypes.string.isRequired,
  }).isRequired,
  activeTab: PropTypes.oneOf(["suggests", "requests"]),
};

export default SuggestRequestCard;
