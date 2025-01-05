import { useOutletContext } from "react-router-dom";
import CancelButton from "../common/CancelButton";
import { UserPopOver } from "../common/UserPopOver";

export default function Members() {
  const { members } = useOutletContext();

  return (
    <div className="bg-white shadow-sm rounded-md p-3">
      <h3 className="font-semibold">Members: {members.length}</h3>
      <ul className="">
        {members.map((member) => (
          <li key={member.id} className="pb-3 sm:pb-4">
            <div className="flex items-center space-x-4 rtl:space-x-reverse">
              <div className="flex-shrink-0">
                <img
                  className="w-8 h-8 rounded-full"
                  src={member.avatarUrl}
                  alt="User image"
                />
              </div>
              <div className="flex-1 min-w-0">
                <UserPopOver user={member}>
                  <span className="text-sm font-medium text-gray-900 truncate dark:text-white hover:underline hover:cursor-pointer">
                    {member.nickname}
                  </span>
                </UserPopOver>
                <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                  @{member.tagName}
                </p>
              </div>
              <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                <CancelButton>Follow</CancelButton>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
