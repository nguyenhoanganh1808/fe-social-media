import { Plus } from "lucide-react";
import LoadingButton from "../common/Spinner/LoadingButton";
import { ModalInvite } from "./ModalInvite";
import useToggle from "../../hooks/useToggle";
import { GroupService } from "../../services/group.service";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

export default function Invite() {
  const { close, isOpen, open } = useToggle();
  const { isOpen: isDropdownOpen, toggle } = useToggle();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const methods = useForm({
    defaultValues: {
      selectedUsers: [],
    },
  });

  const { handleSubmit, setValue } = methods;

  const handleLeave = async () => {
    await GroupService.leaveGroup(id);
  };

  const onSubmit = async (data) => {
    setLoading(true);
    const userIds = data.selectedUsers.map((user) => user.userId);
    const result = await GroupService.inviteFriends(id, userIds);
    if (result.success) {
      close();
    }
    setValue("selectedUsers", []);
    setLoading(false);
  };

  return (
    <>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalInvite
            title="Invite friends to this group"
            closeModal={close}
            openModal={isOpen}
            loading={loading}
          />
        </form>
      </FormProvider>
      <LoadingButton
        type="button"
        onClick={open}
        className="flex items-center gap-2 mr-3 h-fit my-auto"
      >
        <Plus size={20} />
        Invite
      </LoadingButton>
      <button
        id="dropdownMenuIconHorizontalButton"
        onClick={toggle}
        data-dropdown-toggle="dropdownDotsHorizontal"
        className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-900 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none dark:text-white focus:ring-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
        type="button"
      >
        <svg
          className="w-5 h-5"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 16 3"
        >
          <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
        </svg>
      </button>

      {isDropdownOpen && (
        <div
          id="dropdownDotsHorizontal"
          className="z-10 absolute bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600"
        >
          <ul
            className="py-2 text-sm text-gray-700 dark:text-gray-200"
            aria-labelledby="dropdownMenuIconHorizontalButton"
          >
            <li>
              <span
                onClick={handleLeave}
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                Leave
              </span>
            </li>
          </ul>
        </div>
      )}
    </>
  );
}
