import PropTypes from "prop-types";
import { createUserProfile } from "../../../lib/utils";

export default function FollowingUser({ user }) {
  const formatUser = createUserProfile(user);

  return (
    <div key={formatUser.id} className="flex items-center space-x-4 mb-4">
      <img
        className="h-12 w-12 rounded-full"
        src={formatUser.avatarUrl}
        alt={formatUser.nickName}
      />
      <div className="flex-1">
        <div className="text-lg font-medium text-black">{user.username}</div>
        <div className="text-sm text-gray-500">{formatUser.nickName}</div>
      </div>
      <button className="bg-gray-300 hover:bg-gray-400 text-black  py-2 px-4 rounded">
        Following
      </button>
    </div>
  );
}

FollowingUser.propTypes = {
  user: PropTypes.object.isRequired,
};
