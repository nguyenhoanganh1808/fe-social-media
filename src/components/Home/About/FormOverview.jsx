import { useOutletContext } from "react-router-dom";
import useFormUpdateProfile from "../../../hooks/useFormUpdateProfile";
import ErrorText from "../../common/ErrorText";
import LoadingButton from "../../common/Spinner/LoadingButton";
import { useAuth } from "../../../hooks/useAuthContext";

export default function FormOverview() {
  const { errors, handleSubmit, onSubmit, register, validationRules, loading } =
    useFormUpdateProfile();
  const { userInfo } = useOutletContext();
  const { user } = useAuth();
  const isAuthor = userInfo.userId === user.userId;

  if (!isAuthor) {
    // Display a text-only version if the user is not the author
    return (
      <div className="max-w-md mx-auto space-y-3">
        <p>
          <strong>Student Code:</strong> {userInfo.studentCode}
        </p>
        <p>
          <strong>NickName:</strong> {userInfo.nickName}
        </p>
        <p>
          <strong>Tag Name:</strong> {userInfo.tagName}
        </p>
        <p>
          <strong>Birthday:</strong> {userInfo.birthDay}
        </p>
        <p>
          <strong>Gender:</strong> {userInfo.gender}
        </p>
      </div>
    );
  }

  return (
    <form
      noValidate
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-md mx-auto"
    >
      <div className="relative z-0 w-full mb-5 group">
        <input
          {...register("studentCode", validationRules.studentCode)}
          type="text"
          name="studentCode"
          id="studentCode"
          className={`peer block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 ${
            errors.studentCode ? "border-red-500" : "border-gray-300"
          } appearance-none dark:text-white dark:border-gray-600 focus:outline-none focus:ring-0 focus:border-blue-600`}
          placeholder=" "
          required
        />
        <label
          htmlFor="studentCode"
          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Student Code
        </label>
        {errors.studentCode && <ErrorText text={errors.studentCode.message} />}
      </div>
      <div className="relative z-0 w-full mb-5 group">
        <input
          {...register("nickName", validationRules.nickName)}
          type="text"
          name="nickName"
          id="nickName"
          className={`peer block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 ${
            errors.nickName ? "border-red-500" : "border-gray-300"
          } appearance-none dark:text-white dark:border-gray-600 focus:outline-none focus:ring-0 focus:border-blue-600`}
          placeholder=" "
          required
        />
        <label
          htmlFor="nickName"
          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          NickName
        </label>
        {errors.nickName && <ErrorText text={errors.nickName.message} />}
      </div>
      <div className="relative z-0 w-full mb-5 group">
        <input
          type="text"
          {...register("tagName", validationRules.tagName)}
          name="tagName"
          id="tagName"
          className={`peer block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 ${
            errors.tagName ? "border-red-500" : "border-gray-300"
          } appearance-none dark:text-white dark:border-gray-600 focus:outline-none focus:ring-0 focus:border-blue-600`}
          placeholder=" "
          required
        />
        <label
          htmlFor="tagName"
          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Tag Name
        </label>
        {errors.tagName && <ErrorText text={errors.tagName.message} />}
      </div>

      <label htmlFor="birthDay" className="text-sm">
        Birthday
      </label>
      <div className="relative max-w-sm mt-2">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
          <svg
            className="w-4 h-4 text-gray-500 dark:text-gray-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
          </svg>
        </div>
        <input
          id="birthDay"
          {...register("birthDay", validationRules.birthDay)}
          type="date"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </div>
      {errors.birthDay && <ErrorText text={errors.birthDay.message} />}

      <fieldset className="flex gap-3 mt-4">
        <legend className="sr-only">Gender</legend>

        <div className="flex items-center mb-4">
          <input
            {...register("gender")}
            id="gender-option-1"
            type="radio"
            name="gender"
            value="MALE"
            className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-600 dark:focus:bg-blue-600 dark:bg-gray-700 dark:border-gray-600"
          />
          <label
            htmlFor="country-option-2"
            className="block ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            Male
          </label>
        </div>

        <div className="flex items-center mb-4">
          <input
            {...register("gender")}
            id="gender-option-2"
            type="radio"
            name="gender"
            value="FEMALE"
            className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-600 dark:bg-gray-700 dark:border-gray-600"
          />
          <label
            htmlFor="country-option-3"
            className="block ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            Female
          </label>
        </div>
      </fieldset>
      <LoadingButton type="submit" isLoading={loading}>
        Update
      </LoadingButton>
    </form>
  );
}
