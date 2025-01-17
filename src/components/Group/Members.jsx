import { useOutletContext, useParams } from "react-router-dom";
import CancelButton from "../common/CancelButton";
import { useAuth } from "../../hooks/useAuthContext";
import LoadingButton from "../common/Spinner/LoadingButton";

import SpinningContainer from "../common/SpinningContainer";
import useToggle from "../../hooks/useToggle";
import { FormProvider, useForm } from "react-hook-form";
import { useState } from "react";
import { ModalInvite } from "./ModalInvite";
import { GroupService } from "../../services/group.service";

export default function Members() {
  const { members } = useOutletContext();
  const { user } = useAuth();
  const isUserAdmin = members.find((member) => member.userId === user.userId);
  const [loading, setLoading] = useState(false);
  const { isOpen, open, close } = useToggle();
  const methods = useForm({
    defaultValues: {
      selectedUsers: [],
    },
  });

  const { setValue } = methods;
  const { id } = useParams();

  const onSubmit = async (data) => {
    console.log(data);
    setLoading(true);
    const userIds = data.selectedUsers.map((user) => user.userId);
    const result = await GroupService.addMembers(id, userIds);
    if (result.success) {
      close();
    }
    setValue("selectedUsers", []);
    setLoading(false);
  };

  console.log("members: ", members);
  if (!members) {
    return <SpinningContainer />;
  }

  return (
    <div className="bg-white shadow-sm rounded-md p-3">
      <div className="flex justify-between">
        <h3 className="font-semibold">Members: {members.length}</h3>

        {isUserAdmin && (
          <>
            <FormProvider {...methods}>
              <ModalInvite
                title="Add member to this group"
                closeModal={close}
                openModal={isOpen}
                loading={loading}
                onSubmit={onSubmit}
              />
            </FormProvider>
            <LoadingButton type="button" onClick={open}>
              Add member
            </LoadingButton>
          </>
        )}
      </div>
      <ul className="mt-3">
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
                {/* <UserPopOver user={member}>
                  <span className="text-sm font-medium text-gray-900 truncate dark:text-white hover:underline hover:cursor-pointer">
                    {member.nickName}
                  </span>
                </UserPopOver> */}
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
