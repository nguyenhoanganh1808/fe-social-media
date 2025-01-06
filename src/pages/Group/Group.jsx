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

export default function Group() {
  const { id } = useParams();
  const [group, setGroup] = useState({
    name: "",
    description: "",
    id: 0,
    members: [
      {
        id: "",
        username: "",
        email: "",
        nickname: "",
        tagname: "",
        avatarUrl: "",
      },
    ],
  });

  const [loading, setLoading] = useState(false);
  const location = useLocation();

  const fetchGroupDetail = useCallback(async () => {
    setLoading(true);
    const result = await GroupService.getGroupDetail(id);
    const getMemResult = await GroupService.getGroupMembers(id, 0, 10);

    if (result.success && getMemResult.success) {
      setGroup({ ...result.data, members: getMemResult.data });
    }
    setLoading(false);
  }, [id]);

  useEffect(() => {
    fetchGroupDetail();
  }, [fetchGroupDetail]);

  if (loading) {
    return (
      <div className="w-full flex justify-center mt-5">
        <Spinner borderWidth={3} size={30} />;
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col">
      <div className="bg-white mx-auto w-full px-52 shadow-sm">
        <div className="block w-full h-[400px] bg-black"></div>
        <div className="mt-3 flex justify-between">
          <div>
            <h3 className="font-semibold text-3xl">{group.name}</h3>
            <Link
              to={`groups/${id}/members`}
              className="text-gray-500 hover:underline"
            >
              {group.members.length} members
            </Link>
            <AvatarList members={group.members} />
          </div>

          <div className="mt-auto">
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
                  ? "text-blue-500 underline-offset-1"
                  : "text-gray-500"
              }
              key={item.title}
            >
              {item.title}
            </NavLink>
          ))}
        </ul>
      </div>
      <div className="px-52 my-5">
        <Outlet context={{ members: group.members }} />
      </div>
    </div>
  );
}
