import Avatar from "../../../Avatar/Avatar";
import styles from "./Info.module.css";
import PropTypes from "prop-types";
import LucideCIrcleButton from "../../../Button/LucideCircleButton/LucideCircleButton";
import { Bell, CircleUserRound, Search } from "lucide-react";
import ListGroupItem from "./ListGroupItem/ListGroupItem";

export default function Info({ userInfo }) {
  const listGroupData = [
    {
      title: "Chat Info",
    },
    {
      title: "Customize Chat",
    },
    {
      title: "Media and File",
    },
    {
      title: "Privacy and Support",
    },
  ];

  return (
    <div className={styles.wrapper}>
      <div className={styles.userContainer}>
        <Avatar src={userInfo.avatarUrl} alt="" size={70} />
        <p>{userInfo.nickname}</p>
        <p>Active now</p>
      </div>

      <div className={styles.buttonsContainer}>
        <LucideCIrcleButton size={40}>
          <CircleUserRound />
        </LucideCIrcleButton>

        <LucideCIrcleButton size={40}>
          <Bell />
        </LucideCIrcleButton>

        <LucideCIrcleButton size={40}>
          <Search />
        </LucideCIrcleButton>
      </div>

      <div className={styles.listGroupContainer}>
        {listGroupData.map((item, index) => {
          return <ListGroupItem key={index} listItemData={item} />;
        })}
      </div>
    </div>
  );
}

Info.propTypes = {
  userInfo: PropTypes.shape({
    avatarUrl: PropTypes.string,
    isOnline: PropTypes.bool,
    nickname: PropTypes.string,
  }),
};
