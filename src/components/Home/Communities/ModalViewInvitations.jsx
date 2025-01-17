import { Modal } from "flowbite-react";
import PropTypes from "prop-types";
import CancelButton from "../../common/CancelButton";
import LoadingButton from "../../common/Spinner/LoadingButton";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { GroupService } from "../../../services/group.service";
import { Check } from "lucide-react";

export default function ModalViewInvitations({ isOpen, close, invitations }) {
  const [loading, setLoading] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const handleReject = async (invitationId) => {
    // Handle reject logic
    setLoading(true);
    const result = await GroupService.respondInvitation({
      invitationId,
      status: "REJECTED",
    });
    if (result.success) {
      setIsDone(true);
    }
    setLoading(false);
  };

  const handleAccept = async (invitationId) => {
    setLoading(true);
    const result = await GroupService.respondInvitation({
      invitationId,
      status: "ACCEPTED",
    });
    if (result.success) {
      setIsDone(true);
    }
    setLoading(false);
    console.log({ invitationId, status: "ACCEPTED" });
  };

  return (
    <Modal show={isOpen} onClose={close}>
      <Modal.Header>Group Invitations</Modal.Header>
      <Modal.Body>
        <div className="space-y-6 w-full">
          <ul className="my-4 space-y-3 w-full">
            {invitations.map((invitation) => (
              <li key={invitation.id} className="flex-1 space-x-4 w-full">
                <a
                  href="#"
                  className="flex items-center p-3 text-base font-bold text-gray-900 rounded-lg bg-gray-50 hover:bg-gray-100 group hover:shadow dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 64 64"
                    aria-hidden="true"
                    className="h-6 w-6"
                    fill="none"
                  >
                    <circle cx="16" cy="20" r="6" fill="#4F46E5" />
                    <circle cx="32" cy="16" r="8" fill="#4F46E5" />
                    <circle cx="48" cy="20" r="6" fill="#4F46E5" />

                    <rect
                      x="16"
                      y="32"
                      width="32"
                      height="20"
                      rx="2"
                      fill="#F59E0B"
                      stroke="#D97706"
                      strokeWidth="2"
                    />
                    <path
                      d="M16 32l16 12L48 32"
                      fill="#FBBF24"
                      stroke="#D97706"
                      strokeWidth="2"
                    />
                  </svg>

                  <span className="flex-1 ms-3 whitespace-nowrap">
                    {invitation.name}
                  </span>
                  <div>
                    {isDone ? (
                      <Check />
                    ) : (
                      <>
                        {" "}
                        <CancelButton
                          disabled={loading}
                          onClick={() => handleReject(invitation.id)}
                        >
                          Reject
                        </CancelButton>
                        <LoadingButton
                          disabled={loading}
                          onClick={() => handleAccept(invitation.id)}
                        >
                          Accept
                        </LoadingButton>{" "}
                      </>
                    )}
                  </div>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </Modal.Body>
    </Modal>
  );
}
ModalViewInvitations.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
  invitations: PropTypes.array.isRequired,
};
