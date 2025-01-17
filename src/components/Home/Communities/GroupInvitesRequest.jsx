import { useEffect, useState } from "react";
import { GroupService } from "../../../services/group.service";
import useToggle from "../../../hooks/useToggle";
import ModalViewInvitations from "./ModalViewInvitations";

export default function GroupInvitesRequest() {
  const [invitations, setInvitations] = useState([]);
  const [loading, setLoading] = useState(false);
  const { isOpen, open, close } = useToggle();
  useEffect(() => {
    async function fetch() {
      setLoading(true);
      const result = await GroupService.getGroupInvitations();
      if (result.success) {
        setInvitations(result.data);
      }
      setLoading(false);
    }
    fetch();
  }, []);

  if (loading) {
    return null;
  }

  return (
    <>
      <button
        type="button"
        onClick={open}
        className="inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Group Invites
        <span className="inline-flex items-center justify-center w-4 h-4 ms-2 text-xs font-semibold text-blue-800 bg-blue-200 rounded-full">
          {invitations.length}
        </span>
      </button>
      <ModalViewInvitations
        invitations={invitations}
        isOpen={isOpen}
        close={close}
      />
    </>
  );
}
