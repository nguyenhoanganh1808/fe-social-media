import useFetch from "../../../hooks/useFetch";
import { FollowService } from "../../../services/follow.service";
import { Modal } from "flowbite-react";
import SpinningContainer from "../SpinningContainer";
import PropTypes from "prop-types";
import { createUserProfile } from "../../../lib/utils";

export default function FollowersLit({ isOpen, closeModal }) {
  const { data: users, loading } = useFetch(FollowService.getFollowers);
  return (
    <Modal size="xl" show={isOpen} onClose={closeModal}>
      <Modal.Header>Followers</Modal.Header>
      <Modal.Body>
        <div className="max-w-md mx-auto md:max-w-2xl">
          <div className="">
            <div className="mt-4">
              {loading || !users ? (
                <SpinningContainer />
              ) : (
                users.map((user) => {
                  const formatUser = createUserProfile(user);

                  return (
                    <div
                      key={formatUser.id}
                      className="flex items-center space-x-4 mb-4"
                    >
                      <img
                        className="h-12 w-12 rounded-full"
                        src={formatUser.avatarUrl}
                        alt={formatUser.nickName}
                      />
                      <div className="flex-1">
                        <div className="text-lg font-medium text-black">
                          {user.nickName}
                        </div>
                        <div className="text-sm text-gray-500">
                          {formatUser.nickName}
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}

FollowersLit.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
};
