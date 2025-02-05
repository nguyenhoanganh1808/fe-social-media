import useFetch from "../../../hooks/useFetch";
import { FollowService } from "../../../services/follow.service";
import { Modal } from "flowbite-react";
import SpinningContainer from "../SpinningContainer";
import PropTypes from "prop-types";
import FollowingUser from "./FollowingUser";

export default function FollowingList({ isOpen, closeModal }) {
  const { data: users, loading } = useFetch(FollowService.getFollowing);
  return (
    <Modal size="xl" show={isOpen} onClose={closeModal}>
      <Modal.Header>Following</Modal.Header>
      <Modal.Body>
        <div className="max-w-md mx-auto md:max-w-2xl">
          <div className="">
            <div className="mt-4">
              {loading || !users ? (
                <SpinningContainer />
              ) : (
                users.map((user) => {
                  return <FollowingUser key={user.id} user={user} />;
                })
              )}
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}

FollowingList.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
};
