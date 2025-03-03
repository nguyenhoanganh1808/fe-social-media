import { Popover } from "flowbite-react";
import PropTypes from "prop-types";
import { useAuth } from "../../hooks/useAuthContext";
import { FollowService } from "../../services/follow.service";
import { formatNumber } from "../../lib/utils";
import { Link } from "react-router-dom";
import { FirstMessageModal } from "../Message/FIrstMessageModal";
import useToggle from "../../hooks/useToggle";
import { useState } from "react";

export function UserPopOver({ children, user }) {
  console.log("user: ", user);
  const { user: loginUser } = useAuth();
  const { close, isOpen, open } = useToggle();
  const [isFollow, setIsFollow] = useState(false);

  const onFollow = async () => {
    setIsFollow(!isFollow);
    const result = await FollowService.follow(user.userId);
    if (result.error) {
      setIsFollow(isFollow);
    }
  };
  return (
    <>
      <FirstMessageModal isOpen={isOpen} closeModal={close} user={user} />
      <Popover
        onClick={(e) => e.preventDefault()}
        trigger="hover"
        aria-labelledby="profile-popover"
        content={
          <div className="w-64 p-3">
            <div className="mb-2 flex items-center justify-between">
              <Link to={`/profile/${user.userId}`}>
                <img
                  className="h-10 w-10 rounded-full"
                  src={user.avatarUrl}
                  alt={user.nickName}
                />
              </Link>
              {loginUser.userId !== user.userId && (
                <div className="space-x-1">
                  {isFollow ? (
                    <button
                      type="button"
                      onClick={onFollow}
                      className="rounded-lg bg-gray-50 px-3 py-1.5 text-xs font-medium text-black hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                      Request sent
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={onFollow}
                      className="rounded-lg bg-blue-700 px-3 py-1.5 text-xs font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                      Follow
                    </button>
                  )}

                  <button
                    onClick={open}
                    type="button"
                    className="rounded-lg bg-white px-3 py-1.5 text-xs font-medium text-blue-700 hover:bg-gray-200 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Message
                  </button>
                </div>
              )}
            </div>
            <p
              id="profile-popover"
              className="text-base font-semibold leading-none text-gray-900 dark:text-white"
            >
              <span>{user.nickName}</span>
            </p>
            <p className="mb-3 text-sm font-normal">
              <span className="hover:underline">@j{user.tagName}</span>
            </p>
            {/* <p className="mb-4 text-sm">{user.bio}</p> */}
            <ul className="flex text-sm">
              <li className="me-2">
                <span className="hover:underline">
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {formatNumber(user.followingCount || 0)}
                  </span>
                  <span> Following</span>
                </span>
              </li>
              <li>
                <span className="hover:underline">
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {formatNumber(user.followerCount || 0)}
                  </span>
                  <span> Followers</span>
                </span>
              </li>
            </ul>
          </div>
        }
      >
        {children}
      </Popover>
    </>
  );
}

UserPopOver.propTypes = {
  children: PropTypes.node.isRequired,
  user: PropTypes.shape({
    userId: PropTypes.string.isRequired,
    avatarUrl: PropTypes.string.isRequired,
    nickName: PropTypes.string.isRequired,
    tagName: PropTypes.string.isRequired,
    followerCount: PropTypes.number.isRequired,
    followingCount: PropTypes.number.isRequired,
  }),
};
