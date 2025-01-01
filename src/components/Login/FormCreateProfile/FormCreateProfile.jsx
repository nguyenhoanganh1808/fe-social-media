import Input from "../Input/Input";
import styles from "./FormCreateProfile.module.css";
import useFormCreateProfile from "../../../hooks/useFormCreateProfile";
import { majors } from "../../../lib/constants";
import LoadingButton from "../../common/Spinner/LoadingButton";

export default function FormCreateProfile() {
  const { register, handleSubmit, errors, onSubmit, validationRules, loading } =
    useFormCreateProfile();

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}></div>
      <form
        noValidate
        onSubmit={handleSubmit(onSubmit)}
        className={styles.container}
      >
        {/* Student Code */}
        <Input
          id="code"
          label="Student Code"
          placeHolder="Enter your student code"
          type="text"
          isError={!!errors.code}
          register={register("code", validationRules.code)}
          required
          isRow={true}
        />
        {errors.code && (
          <p role="alert" className={styles.error}>
            {errors.code.message}
          </p>
        )}

        {/* Nickname */}
        <Input
          id="nickname"
          label="Nickname"
          placeHolder="Enter your nickname"
          type="text"
          isError={!!errors.nickName}
          register={register("nickName", validationRules.nickName)}
          required
          isRow={true}
        />
        {errors.nickName && (
          <p role="alert" className={styles.error}>
            {errors.nickName.message}
          </p>
        )}

        {/* Tag Name */}
        <Input
          id="tagName"
          label="Tag Name"
          placeHolder="Enter your tag name"
          type="text"
          isError={!!errors.tagName}
          register={register("tagName", validationRules.tagName)}
          required
          isRow={true}
        />
        {errors.tagName && (
          <p role="alert" className={styles.error}>
            {errors.tagName.message}
          </p>
        )}

        {/* Gender */}
        <div className={styles.radioGroup}>
          <label>Gender:</label>
          <div>
            <div>
              <input
                {...register("gender", validationRules.gender)}
                type="radio"
                id="male"
                value="MALE"
              />
              <label htmlFor="male">Male</label>
            </div>
            <div>
              <input
                {...register("gender", validationRules.gender)}
                type="radio"
                id="female"
                value="FEMALE"
              />
              <label htmlFor="female">Female</label>
            </div>
          </div>
        </div>
        {errors.gender && (
          <p role="alert" className={styles.error}>
            {errors.gender.message}
          </p>
        )}

        <div className="ml-2 flex gap-12">
          <label
            htmlFor="majors"
            className="font-bold block mb-2 text-base text-gray-900 dark:text-white"
          >
            Select an major
          </label>
          <select
            {...register("major")}
            id="majors"
            className="max-w-[378px] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option selected>Choose a major</option>
            {majors.map((major) => {
              return (
                <option key={major} value={major}>
                  {major}
                </option>
              );
            })}
          </select>
        </div>

        {/* School Year */}
        <Input
          id="schoolYear"
          label="School Year"
          placeHolder="Enter your school year"
          type="number"
          isError={!!errors.schoolYear}
          register={register("schoolYear", validationRules.schoolYear)}
          required
          isRow={true}
        />
        {errors.schoolYear && (
          <p role="alert" className={styles.error}>
            {errors.schoolYear.message}
          </p>
        )}

        {/* Activity Class */}
        <Input
          id="activityClass"
          label="Activity Class"
          placeHolder="Enter your activity class"
          type="text"
          isError={!!errors.activityClass}
          register={register("activityClass", validationRules.activityClass)}
          required
          isRow={true}
        />
        {errors.activityClass && (
          <p role="alert" className={styles.error}>
            {errors.activityClass.message}
          </p>
        )}

        {/* Birthday */}
        <Input
          id="birthday"
          label="Birthday"
          type="date"
          isError={!!errors.birthday}
          register={register("birthday", validationRules.birthday)}
          required
          isRow={true}
        />
        {errors.birthday && (
          <p role="alert" className={styles.error}>
            {errors.birthday.message}
          </p>
        )}

        {/* Phone Number */}
        <Input
          id="phoneNumber"
          label="Phone Number"
          placeHolder="Enter your phone number"
          type="tel"
          isError={!!errors.phoneNumber}
          register={register("phoneNumber", validationRules.phoneNumber)}
          required
          isRow={true}
        />
        {errors.phoneNumber && (
          <p role="alert" className={styles.error}>
            {errors.phoneNumber.message}
          </p>
        )}

        {/* Address */}
        <Input
          id="address"
          label="Address"
          placeHolder="Enter your address"
          type="text"
          isError={!!errors.address}
          register={register("address", validationRules.address)}
          required
          isRow={true}
        />
        {errors.address && (
          <p role="alert" className={styles.error}>
            {errors.address.message}
          </p>
        )}

        <LoadingButton type="submit" isLoading={loading}>
          CREATE PROFILE
        </LoadingButton>
      </form>
    </div>
  );
}
