import { Modal } from "flowbite-react";

import PropTypes from "prop-types";
import { ChatGroupService } from "../../../../services/chat-group.service";
import LoadingButton from "../../../common/Spinner/LoadingButton";
import { SearchService } from "../../../../services/search.service";
import { createUserProfile } from "../../../../lib/utils";
import { Controller, useForm } from "react-hook-form";
import useSearch from "../../../../hooks/useSearch";
import { X } from "lucide-react";
import { useParams } from "react-router-dom";
import { useState } from "react";

export default function FormAddMemberModal({
  isOpenModal,
  onCloseModal,
  setMembers,
}) {
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  const { searchResults, searchValue, setSearchValue } = useSearch(
    SearchService.searchUser,
    [
      {
        avatarUrl: "",
        email: "",
        id: "",
        nickName: "",
        tagName: "",
        username: "",
      },
    ]
  );
  const searchUsersResultFormat = searchResults.map((user) =>
    createUserProfile(user)
  );
  const { watch, setValue, control, handleSubmit } = useForm({
    defaultValues: {
      selectedUsers: [],
    },
  });

  const selectedUsers = watch("selectedUsers");
  console.log("selectedUsers: ", selectedUsers);

  const handleSelection = (personId, checked) => {
    const currentSelections = watch("selectedUsers");
    const user = searchUsersResultFormat.find(
      (result) => result.userId === personId
    );
    if (checked) {
      setValue("selectedUsers", [...currentSelections, user]);
    } else {
      setValue(
        "selectedUsers",
        currentSelections.filter((prs) => prs.userId !== user.userId)
      );
    }
  };

  const onSubmit = async (data) => {
    console.log(data);
    const memberIds = selectedUsers.map((user) => user.userId);
    setLoading(true);
    const result = await ChatGroupService.addChatGroupMember(id, memberIds);
    if (result.success) {
      setMembers((prevMemers) => [...prevMemers, ...selectedUsers]);
    }
    setLoading(false);
  };

  return (
    <Modal show={isOpenModal} size="md" onClose={onCloseModal} popup>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
        <Modal.Header>Add member to group chat</Modal.Header>
        <Modal.Body>
          <div>
            <div className="w-full">
              <div className="mt-3 w-full">
                <div className="max-h-36 overflow-y-auto">
                  {selectedUsers?.map((user) => {
                    return (
                      <li key={user.user} className="flex items-center p-2">
                        <img
                          className="w-6 h-6 me-2 rounded-full"
                          src={user.avatarUrl}
                          alt={user.nickName}
                        />
                        {user.nickName}
                        <button
                          type="button"
                          className="text-red-500 hover:text-red-700 ml-auto"
                          onClick={() => {
                            setValue(
                              "selectedUsers",
                              selectedUsers.filter(
                                (selectedUser) =>
                                  selectedUser.userId !== user.userId
                              )
                            );
                          }}
                        >
                          <X />
                        </button>
                      </li>
                    );
                  })}
                </div>
                <label htmlFor="input-group-search" className="sr-only">
                  Search
                </label>
                <div className="relative w-full">
                  <div className="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
                    <svg
                      className="w-4 h-4 text-gray-500 dark:text-gray-400"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 20"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                      />
                    </svg>
                  </div>
                  <input
                    type="text"
                    id="input-group-search"
                    className="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Search user"
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                  />
                </div>
              </div>

              <ul
                className="h-48 px-3 pb-3 overflow-y-auto text-sm text-gray-700 dark:text-gray-200"
                aria-labelledby="dropdownSearchButton"
              >
                {searchUsersResultFormat.map((person) => (
                  <li key={person.userId}>
                    <div className="flex items-center ps-4 hover:bg-gray-200 hover:cursor-pointer rounded dark:border-gray-700 pr-3">
                      <label
                        htmlFor={person.userId}
                        className="w-full py-1 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                      >
                        <span className=" font-semibold flex items-center">
                          <img
                            className="w-9 h-9 me-2 rounded-full"
                            src={person.avatarUrl}
                            alt={person.nickName}
                          />
                          {person.nickName}
                        </span>
                      </label>
                      <Controller
                        name="selectedUsers"
                        control={control}
                        render={({ field }) => (
                          <input
                            {...field}
                            id={person.userId}
                            type="checkbox"
                            value={person.userId}
                            onChange={(e) =>
                              handleSelection(person.userId, e.target.checked)
                            }
                            className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                          />
                        )}
                      />
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <LoadingButton disabled={loading} type="submit">
            Create
          </LoadingButton>
        </Modal.Footer>
      </form>
    </Modal>
  );
}

FormAddMemberModal.propTypes = {
  isOpenModal: PropTypes.bool.isRequired,
  onCloseModal: PropTypes.func.isRequired,
  setMembers: PropTypes.func.isRequired,
};
