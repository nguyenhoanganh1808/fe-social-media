import PropTypes from "prop-types";
import styles from "./UserCard.module.css"

function UserCard({ followersNumber, followingNumber, name, link, bio }) {
  return <div>
    
  </div>;
}

UserCard.propTypes = {
  followersNumber: PropTypes.number,
  followingNumber: PropTypes.number,
  name: PropTypes.string.isRequired,
  link: PropTypes.string,
  bio: PropTypes.string,
};

export default UserCard;
