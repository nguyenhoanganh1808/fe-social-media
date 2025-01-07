import { useOutletContext } from "react-router-dom";
import useFormUpdateContact from "../../../hooks/useFormUpdateContact";
import ErrorText from "../../common/ErrorText";
import LoadingButton from "../../common/Spinner/LoadingButton";
import { useAuth } from "../../../hooks/useAuthContext";

export default function FormContact() {
  const { errors, handleSubmit, onSubmit, register, validationRules, loading } =
    useFormUpdateContact();
  const { userInfo } = useOutletContext();
  const { user } = useAuth();
  const isAuthor = userInfo.userId === user.userId;
  if (!isAuthor) {
    // Display a text-only version if the user is not the author
    return (
      <div className="max-w-md mx-auto space-y-3">
        <p>
          <strong>Email:</strong> {userInfo.contact.email}
        </p>
        <p>
          <strong>Phone number:</strong> {userInfo.contact.phoneNumber}
        </p>
        <p>
          <strong>Address:</strong> {userInfo.contact.address}
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
          {...register("email", validationRules.email)}
          type="email"
          name="email"
          id="email"
          className={`peer block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 ${
            errors.email ? "border-red-500" : "border-gray-300"
          } appearance-none dark:text-white dark:border-gray-600 focus:outline-none focus:ring-0 focus:border-blue-600`}
          placeholder=" "
          required
        />
        <label
          htmlFor="studentCode"
          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Email address
        </label>
        {errors.email && <ErrorText text={errors.email.message} />}
      </div>
      <div className="relative z-0 w-full mb-5 group">
        <input
          {...register("phone", validationRules.phone)}
          type="tel"
          name="phone"
          id="phone"
          className={`peer block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 ${
            errors.phone ? "border-red-500" : "border-gray-300"
          } appearance-none dark:text-white dark:border-gray-600 focus:outline-none focus:ring-0 focus:border-blue-600`}
          placeholder=" "
          required
        />
        <label
          htmlFor="phone"
          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Phone number (123-456-7890)
        </label>
        {errors.phone && <ErrorText text={errors.phone.message} />}
      </div>
      <div className="relative z-0 w-full mb-5 group">
        <input
          type="text"
          {...register("address", validationRules.address)}
          name="address"
          id="address"
          className={`peer block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 ${
            errors.address ? "border-red-500" : "border-gray-300"
          } appearance-none dark:text-white dark:border-gray-600 focus:outline-none focus:ring-0 focus:border-blue-600`}
          placeholder=" "
          required
        />
        <label
          htmlFor="address"
          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Address
        </label>
        {errors.address && <ErrorText text={errors.address.message} />}
      </div>

      <LoadingButton type="submit" isLoading={loading}>
        Update
      </LoadingButton>
    </form>
  );
}
