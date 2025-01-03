import { Modal } from "flowbite-react";
import LoadingButton from "../../common/Spinner/LoadingButton";
import PropTypes from "prop-types";
import useFormEditSkills from "../../../hooks/useFormEditSkills";

export default function FormEditSkills({ onCloseModal, openModal }) {
  const { fields, append, handleSubmit, onSubmit, remove, register, loading } =
    useFormEditSkills();
  return (
    <Modal show={openModal} size="md" onClose={onCloseModal} popup>
      <Modal.Header>Edit your skill</Modal.Header>
      <Modal.Body className="mt-3">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {fields.map((field, index) => (
            <div key={field.id} className="flex items-center max-w-sm mx-auto">
              <div className="relative w-full">
                <input
                  {...register(`skills.${index}.value`)}
                  type="text"
                  id="simple-search"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Your skill"
                  required
                />
              </div>
              <button
                onClick={() => remove(field.id)}
                type="button"
                className="p-2.5 ms-2 text-sm font-medium text-white bg-red-700 rounded-lg border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
              >
                <svg
                  className="w-4 h-4"
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
                    d="M6 6l8 8M6 14L14 6"
                  />
                </svg>
                <span className="sr-only">Remove</span>
              </button>
            </div>
          ))}

          <div className="flex flex-col space-y-2">
            <LoadingButton
              onClick={() => append({ value: "" })}
              className="bg-white border-blue-500 outline-blue-500 ring-blue-500 hover:bg-white"
            >
              <span className="text-blue-500">Add more skill</span>
            </LoadingButton>
            <LoadingButton isLoading={loading}>Save</LoadingButton>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
}

FormEditSkills.propTypes = {
  onCloseModal: PropTypes.func.isRequired,
  openModal: PropTypes.bool.isRequired,
};
