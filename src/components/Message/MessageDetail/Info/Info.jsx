import Avatar from "../../../Avatar/Avatar";
import styles from "./Info.module.css";
import PropTypes from "prop-types";
import LucideCIrcleButton from "../../../Button/LucideCircleButton/LucideCircleButton";
import { Bell, ChevronLeft, CircleUserRound, Search } from "lucide-react";
import ListGroupItem from "./ListGroupItem/ListGroupItem";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ChatGroupService } from "../../../../services/chat-group.service";
import { useAuth } from "../../../../hooks/useAuthContext";
import UserControlDropDown from "./UserControlDropDown";
import TextButton from "../../../common/TextButton";
import useToggle from "../../../../hooks/useToggle";
import FormAddMemberModal from "./FormAddMemberModal";
import SpinningContainer from "../../../common/SpinningContainer";

export default function Info({ userInfo, closeInfoMobile }) {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const { id, chatType } = useParams();
  const listGroupData = [
    {
      title: "Chat members",
    },
  ];
  const { user } = useAuth();
  const { isOpen, open, close } = useToggle();

  const handleRemoveUser = async (userId) => {
    const previousMembers = [...members];
    setMembers((prevMembers) =>
      prevMembers.filter((member) => member.userId !== userId)
    );
    console.log("user: ", userId);
    const result = await ChatGroupService.removeChatGroupMember(id, userId);
    if (result.error) {
      setMembers(previousMembers);
    }
  };

  useEffect(() => {
    async function fetch() {
      setLoading(true);
      if (chatType === "group-chat") {
        const result = await ChatGroupService.getChatGroupMembers(id);
        if (result.success) {
          setMembers(result.data);
        }
      }
      setLoading(false);
    }
    fetch();
  }, [chatType, id]);

  {
    members.length === 0 && (
      <div className="text-center text-gray-500">Loading group members...</div>
    );
  }

  if (!userInfo) return <SpinningContainer />;

  return (
    <div className={styles.wrapper}>
      <div
        className="p-2 rounded-full w-fit hover:bg-slate-200 hover:cursor-pointer"
        onClick={closeInfoMobile}
      >
        <ChevronLeft />
      </div>
      <div className={styles.userContainer}>
        <Avatar src={userInfo.avatarUrl} alt="" size={70} />
        <p>{userInfo.nickName}</p>
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
        {loading ? (
          <SpinningContainer />
        ) : (
          listGroupData.map((item, index) => {
            return (
              <ListGroupItem key={index} listItemData={item}>
                {members.map((member) => {
                  return (
                    <li
                      key={member.id}
                      className="flex items-center gap-4 p-2 bg-gray-50 hover:bg-gray-100 rounded-lg transition"
                    >
                      {/* Avatar */}
                      <div className="w-6 h-6">
                        <img
                          src={member.avatarUrl}
                          alt={`${member.name}'s avatar`}
                          className="w-full h-full rounded-full object-cover"
                        />
                      </div>

                      {/* Name and Status */}
                      <div className="flex-grow">
                        <p className="text-sm font-medium text-gray-900">
                          {member.nickName}
                        </p>
                      </div>

                      {/* Action Button */}
                      {user.userId !== member.userId && (
                        <UserControlDropDown
                          user={member}
                          handleRemoveUser={handleRemoveUser}
                        />
                      )}
                    </li>
                  );
                })}
                <div className="w-full">
                  <TextButton onClick={open}>Add people</TextButton>
                  <FormAddMemberModal
                    isOpenModal={isOpen}
                    onCloseModal={close}
                    setMembers={setMembers}
                  />
                </div>
              </ListGroupItem>
            );
          })
        )}
      </div>
    </div>
  );
}

Info.propTypes = {
  userInfo: PropTypes.shape({
    avatarUrl: PropTypes.string,
    isOnline: PropTypes.bool,
    nickName: PropTypes.string,
  }),
  closeInfoMobile: PropTypes.func.isRequired,
};
