import { useOutletContext } from "react-router-dom";
import useFormUpdateInformationDetail from "../../../hooks/useFormUpdateInformationDetail";
import { majors } from "../../../lib/constants";
import ErrorText from "../../common/ErrorText";
import LoadingButton from "../../common/Spinner/LoadingButton";
import { useAuth } from "../../../hooks/useAuthContext";

export default function FormInformationDetail() {
  const { errors, handleSubmit, onSubmit, register, validationRules, loading } =
    useFormUpdateInformationDetail();
  const { userInfo } = useOutletContext();
  const { user } = useAuth();
  const isAuthor = userInfo.userId === user.userId;

  if (!isAuthor) {
    // Display a text-only version if the user is not the author
    return (
      <div className="max-w-md mx-auto space-y-3">
        <p>
          <strong>Full name:</strong> {userInfo.informationDetail.fullName}
        </p>
        <p>
          <strong>Major:</strong> {userInfo.informationDetail.major}
        </p>
        <p>
          <strong>School year:</strong> {userInfo.informationDetail.schoolYear}
        </p>
        <p>
          <strong>Activity class:</strong>{" "}
          {userInfo.informationDetail.activityClass}
        </p>
        {userInfo.informationDetail.work > 0 && (
          <p>
            <strong>Work:</strong> {userInfo.informationDetail.work[0]}
          </p>
        )}
        <p>
          <strong>Current city:</strong>{" "}
          {userInfo.informationDetail.currentCity}
        </p>
        <p>
          <strong>Home town:</strong> {userInfo.informationDetail.homeTown}
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
      <div className="relative z-0 w-full mb-5 mt-3 group">
        <input
          {...register("fullName", validationRules.fullName)}
          type="text"
          name="fullName"
          id="fullName"
          className={`peer block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 ${
            errors.fullName ? "border-red-500" : "border-gray-300"
          } appearance-none dark:text-white dark:border-gray-600 focus:outline-none focus:ring-0 focus:border-blue-600`}
          placeholder=" "
          required
        />
        <label
          htmlFor="fullName"
          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Full Name
        </label>
        {errors.fullName && <ErrorText text={errors.fullName.message} />}
      </div>
      <select
        id="countries"
        {...register("major", validationRules.major)}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      >
        <option selected>Choose a major</option>
        {majors.map((major) => (
          <option value={major} key={major}>
            {major}
          </option>
        ))}
      </select>
      <div className="relative z-0 w-full mb-5 group mt-3">
        <input
          {...register("schoolYear", validationRules.schoolYear)}
          type="text"
          name="schoolYear"
          id="schoolYear"
          className={`peer block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 ${
            errors.schoolYear ? "border-red-500" : "border-gray-300"
          } appearance-none dark:text-white dark:border-gray-600 focus:outline-none focus:ring-0 focus:border-blue-600`}
          placeholder=" "
          required
        />
        <label
          htmlFor="schoolYear"
          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          School Year
        </label>
        {errors.schoolYear && <ErrorText text={errors.schoolYear.message} />}
      </div>

      <div className="relative z-0 w-full mb-5 group">
        <input
          type="text"
          {...register("activityClass", validationRules.activityClass)}
          name="activityClass"
          id="activityClass"
          className={`peer block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 ${
            errors.activityClass ? "border-red-500" : "border-gray-300"
          } appearance-none dark:text-white dark:border-gray-600 focus:outline-none focus:ring-0 focus:border-blue-600`}
          placeholder=" "
          required
        />
        <label
          htmlFor="activityClass"
          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Activity Class
        </label>
        {errors.activityClass && (
          <ErrorText text={errors.activityClass.message} />
        )}
      </div>

      <div className="relative z-0 w-full mb-5 group">
        <input
          type="text"
          {...register("work", validationRules.work)}
          name="work"
          id="work"
          className={`peer block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 ${
            errors.work ? "border-red-500" : "border-gray-300"
          } appearance-none dark:text-white dark:border-gray-600 focus:outline-none focus:ring-0 focus:border-blue-600`}
          placeholder=" "
          required
        />
        <label
          htmlFor="work"
          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Work
        </label>
        {errors.work && <ErrorText text={errors.work.message} />}
      </div>

      <div className="relative z-0 w-full mb-5 group">
        <input
          type="text"
          {...register("currentCity", validationRules.currentCity)}
          name="currentCity"
          id="currentCity"
          className={`peer block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 ${
            errors.activityClass ? "border-red-500" : "border-gray-300"
          } appearance-none dark:text-white dark:border-gray-600 focus:outline-none focus:ring-0 focus:border-blue-600`}
          placeholder=" "
          required
        />
        <label
          htmlFor="currentCity"
          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Current City
        </label>
        {errors.currentCity && <ErrorText text={errors.currentCity.message} />}
      </div>

      <div className="relative z-0 w-full mb-5 group">
        <input
          type="text"
          {...register("homeTown", validationRules.homeTown)}
          name="homeTown"
          id="homeTown"
          className={`peer block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 ${
            errors.activityClass ? "border-red-500" : "border-gray-300"
          } appearance-none dark:text-white dark:border-gray-600 focus:outline-none focus:ring-0 focus:border-blue-600`}
          placeholder=" "
          required
        />
        <label
          htmlFor="homeTown"
          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Home Town
        </label>
        {errors.homeTown && <ErrorText text={errors.homeTown.message} />}
      </div>

      <LoadingButton type="submit" isLoading={loading}>
        Update
      </LoadingButton>
    </form>
  );
}
