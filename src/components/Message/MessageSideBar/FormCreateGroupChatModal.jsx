import { Modal } from "flowbite-react";

import LoadingButton from "../../common/Spinner/LoadingButton";

import useFormCreateGroup from "../../../hooks/useFormCreateGroup";
import PropTypes from "prop-types";
import { ChatGroupService } from "../../../services/chat-group.service";
import Input from "../../common/Input";

export default function FormCreateGroupChatModal({
  isOpenModal,
  onCloseModal,
}) {
  const {
    errors,
    filterUsers,
    handleSubmit,
    onSubmit,
    register,
    searchValue,
    setSearchValue,
    loading,

    validationRules,
  } = useFormCreateGroup(ChatGroupService.CreateChatGroup, onCloseModal);

  return (
    <Modal show={isOpenModal} size="md" onClose={onCloseModal} popup>
      <Modal.Header>Create new group chat</Modal.Header>
      <Modal.Body>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4"
          noValidate
        >
          <div>
            <Input
              id="chatGroupName"
              label="Group name"
              type="text"
              errors={errors.name}
              register={register}
              rules={validationRules.name}
            />

            <div className="mt-3 w-full">
              <div className="w-full">
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
                {filterUsers.map((user, index) => (
                  <li key={`${user.userId}-${index}`}>
                    <div className="flex items-center ps-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                      <input
                        id={`member-${user.userId}`}
                        {...register("memberIds")}
                        type="checkbox"
                        value={user.userId}
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                      />
                      <label
                        htmlFor={`member-${user.userId}`}
                        className="w-full py-2 ms-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300"
                      >
                        <a
                          href="#"
                          className="flex items-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                        >
                          <img
                            className="w-6 h-6 me-2 rounded-full"
                            src={user.avatarUrl}
                            alt="Jese image"
                          />
                          {user.nickName}
                        </a>
                      </label>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <LoadingButton isLoading={loading} type="submit">
            Create
          </LoadingButton>
        </form>
      </Modal.Body>
    </Modal>
  );
}

FormCreateGroupChatModal.propTypes = {
  isOpenModal: PropTypes.bool.isRequired,
  onCloseModal: PropTypes.func.isRequired,
};
