import Input from "../Input/Input";
import styles from "./FormCreateProfile.module.css";
import useFormCreateProfile from "../../../hooks/useFormCreateProfile";
import { majors } from "../../../lib/constants";
import LoadingButton from "../../common/Spinner/LoadingButton";
import { roleData } from "../FormSignUp/roles-data";

export default function FormCreateLectureProfile() {
  const { register, handleSubmit, errors, onSubmit, validationRules, loading } =
    useFormCreateProfile(roleData.Lecture.key);

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}></div>
      <form
        noValidate
        onSubmit={handleSubmit(onSubmit)}
        className={styles.container}
      >
        {/* Lecture Code */}
        <Input
          id="lectureCode"
          label="Lecture Code"
          placeHolder="Enter your lecture code"
          type="text"
          isError={!!errors.lectureCode}
          register={register("lectureCode", validationRules.lectureCode)}
          required
          isRow={true}
        />
        {errors.lectureCode && (
          <p role="alert" className={styles.error}>
            {errors.lectureCode.message}
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
          <label>Gender: (*)</label>
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

        <div className="flex justify-between mx-3">
          <label
            htmlFor="majors"
            className="font-bold block mb-2 text-base text-gray-900 dark:text-white"
          >
            Department (*)
          </label>
          <select
            {...register("department")}
            id="department"
            className="max-w-[378px] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
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
          id="yearsOfExperience"
          label="Year Of Experience"
          placeHolder="Enter your Year Of Experience"
          type="tel"
          isError={!!errors.yearsOfExperience}
          register={register(
            "yearsOfExperience",
            validationRules.yearsOfExperience
          )}
          required
          isRow={true}
        />
        {errors.yearsOfExperience && (
          <p role="alert" className={styles.error}>
            {errors.yearsOfExperience.message}
          </p>
        )}

        {/* Office Location */}
        <Input
          id="officeLocation"
          label="Office Location"
          placeHolder="Enter your Office Location"
          type="text"
          isError={!!errors.officeLocation}
          register={register("officeLocation", validationRules.officeLocation)}
          required
          isRow={true}
        />
        {errors.officeLocation && (
          <p role="alert" className={styles.error}>
            {errors.officeLocation.message}
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
