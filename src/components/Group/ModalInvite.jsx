import { Modal } from "flowbite-react";
import PropTypes from "prop-types";
import CancelButton from "../common/CancelButton";
import LoadingButton from "../common/Spinner/LoadingButton";
import SearchInput from "./SearchInput";
import useSearch from "../../hooks/useSearch";
import { SearchService } from "../../services/search.service";
import { Controller, useFormContext } from "react-hook-form";
import { createUserProfile } from "../../lib/utils";

export function ModalInvite({
  openModal,
  closeModal,
  loading,
  title,
  onSubmit,
}) {
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
  const { watch, setValue, control, handleSubmit } = useFormContext();

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

  return (
    <>
      <Modal size="4xl" show={openModal} onClose={closeModal}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Modal.Header>{title}</Modal.Header>
          <Modal.Body>
            <div className="space-y-6 flex gap-3 ">
              <div className="basis-2/3 ">
                <SearchInput setValue={setSearchValue} value={searchValue} />
                <h3 className="font-semibold mt-3">Suggest</h3>
                <ul className="space-y-3 max-h-96 overflow-y-auto">
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

              <div className="basis-1/3 bg-gray-50 min-h-max">
                <h3 className="font-semibold">Selected Users</h3>
                <ul className="space-y-2">
                  {selectedUsers.map((user) => {
                    return (
                      <li key={user.user} className="flex items-center p-2">
                        <img
                          className="w-6 h-6 me-2 rounded-full"
                          src={user.avatarUrl}
                          alt={user.nickName}
                        />
                        {user.nickName}
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <div className="ml-auto">
              <CancelButton>Cancel</CancelButton>
              <LoadingButton
                type="submit"
                disabled={selectedUsers.length === 0 || loading}
              >
                Submit
              </LoadingButton>
            </div>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  );
}

ModalInvite.propTypes = {
  openModal: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
};
