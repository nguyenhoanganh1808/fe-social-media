import { Plus } from "lucide-react";
import LucideCircleButton from "../../Button/LucideCircleButton/LucideCircleButton";
import styles from "./Communities.module.css";
import useToggle from "../../../hooks/useToggle";
import FormCreateGroupModal from "./FormCreateGroupModal";
import { useEffect, useState } from "react";
import { GroupService } from "../../../services/group.service";
import { useAuth } from "../../../hooks/useAuthContext";
import { Link } from "react-router-dom";
import GroupInvitesRequest from "./GroupInvitesRequest";
// import useFethcInfinityData from '../../../hooks/useFetchInfinityData'

export default function Communities() {
  const { close, isOpen, open } = useToggle();
  const { user } = useAuth();
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    async function fetch() {
      const result = await GroupService.getGroupsByUserId(user.userId);
      if (result.success) {
        setGroups(result.data);
      }
    }
    fetch();
  }, [user.userId]);

  return (
    <div className={styles.wrapper}>
      <GroupInvitesRequest />
      <FormCreateGroupModal onCloseModal={close} openModal={isOpen} />
      <div className="flex justify-between items-center h-full">
        <h1 className={styles.header}>Communities</h1>

        <LucideCircleButton onClick={open} size={25}>
          <Plus />
        </LucideCircleButton>
      </div>
      <ul className={styles.communitiesList}>
        {groups.map((community) => (
          <Link
            to={`groups/${community.id}`}
            className={`${styles.container} hover:bg-gray-200 p-2 rounded-md`}
            key={community.id}
          >
            <img
              className={styles.communityImage}
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVwsinqKdhRO24tRJc6xjoZ_4YOaRLR_0Olg&s"
              alt={community.name}
            />
            <div>
              <p className={styles.communityName}>{community.name}</p>
              {/* <p className={styles.friendsIn}>
                {community.friends} your friends are in
              </p> */}
            </div>
          </Link>
        ))}
      </ul>
    </div>
  );
}
