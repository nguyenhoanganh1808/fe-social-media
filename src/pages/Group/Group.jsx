import { useCallback, useEffect, useState } from "react";
import {
  Link,
  NavLink,
  Outlet,
  useLocation,
  useParams,
} from "react-router-dom";
import { GroupService } from "../../services/group.service";
import AvatarList from "../../components/Group/AvatarList";
import { groupNavItem } from "../../lib/constants";
import Spinner from "../../components/common/Spinner/Spinner";
import Invite from "../../components/Group/Invite";
import { createUserProfile } from "../../lib/utils";
import { useAuth } from "../../hooks/useAuthContext";

export default function Group() {
  const { id } = useParams();
  const [group, setGroup] = useState({
    name: "Loading...",
    description: "",
    id: 0,
    members: [],
  });

  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const { user } = useAuth();
  const isUserAdmin = group.members.find(
    (member) => member.userId === user.userId
  );
  const fetchGroupDetail = useCallback(async () => {
    if (sessionStorage.getItem(`group_${id}`)) {
      setGroup(JSON.parse(sessionStorage.getItem(`group_${id}`)));
      return;
    }

    setLoading(true);
    try {
      const result = await GroupService.getGroupDetail(id);
      const getMemResult = await GroupService.getGroupMembers(id, 0, 10);

      if (result.success && getMemResult.success) {
        const groupData = {
          ...result.data,
          members: getMemResult.data.map((user) => createUserProfile(user)),
        };
        setGroup(groupData);
        sessionStorage.setItem(`group_${id}`, JSON.stringify(groupData));
      } else {
        throw new Error("Failed to fetch group data.");
      }
    } catch (error) {
      console.error("Error fetching group details:", error.message);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      fetchGroupDetail();
    }
  }, [id, fetchGroupDetail]);

  if (loading) {
    return (
      <div className="w-full flex justify-center mt-5">
        <Spinner borderWidth={3} size={30} />
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col">
      <div className="bg-white mx-auto w-full lg:px-52 px-3 shadow-sm">
        <div className="block w-full h-[400px] bg-black"></div>
        <div className="lg:flex lg:flex-row flex-col justify-between">
          <div className="lg:w-2/3">
            <h3 className="font-semibold text-2xl lg:text-3xl">{group.name}</h3>
            <Link
              to={`groups/${id}/members`}
              className="text-gray-500 hover:underline"
            >
              {group.members.length} members
            </Link>
            <AvatarList members={group.members} />
          </div>
          <div className="mt-4 lg:mt-0 lg:w-1/3 flex justify-end">
            <Invite />
          </div>
        </div>

        <hr className="h-px mt-4 bg-gray-400 border-0 dark:bg-gray-700" />
        <ul className="space-x-6 py-5">
          {groupNavItem.map((item) => (
            <NavLink
              to={`/groups/${id}/${item.to}`}
              className={({ isActive }) =>
                (isActive && item.to !== "") ||
                `/groups/${id}/${item.to}` === location.pathname
                  ? "text-blue-500 underline underline-offset-4 font-semibold"
                  : "text-gray-500 hover:text-blue-400"
              }
              key={item.title}
            >
              {item.title}
            </NavLink>
          ))}
          {isUserAdmin && (
            <NavLink
              to={`/groups/${id}/pending-posts`}
              className={({ isActive }) =>
                isActive
                  ? "text-blue-500 underline underline-offset-4 font-semibold"
                  : "text-gray-500 hover:text-blue-400"
              }
            >
              Pending Posts
            </NavLink>
          )}
        </ul>
      </div>
      <div className="lg:px-52 px-3 my-5">
        <Outlet context={{ members: group.members }} />
      </div>
    </div>
  );
}
