import LoadingButton from "../common/Spinner/LoadingButton";

import Input from "../common/Input";
import { useForm } from "react-hook-form";
import { EduService } from "../../services/edu.service";
import { setCookie } from "../../lib/utils";
import PropTypes from "prop-types";
import { useState } from "react";

export default function IdentityConfirmModal({ setIsAuthen }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(false);

  const validationRules = {
    username: {
      required: "Username is required",
      minLength: {
        message: "Username must be at least 4 characters long",
        value: 4,
      },
      maxLength: {
        message: "Username must be no more than 15 characters long",
        value: 15,
      },
      pattern: {
        value: /^[a-zA-Z0-9_]+$/,
        message: "Username can only contain letters, numbers, and underscores",
      },
    },
    password: {
      required: "Password is required",
      minLength: {
        message: "Password must be at least 6 characters long",
        value: 6,
      },
      maxLength: {
        message: "Password must be no more than 20 characters long",
        value: 20,
      },
      // pattern: {
      //   value: /^(?=.*[a-zA-Z])(?=.*[!@#$%^&*(),.?":{}|<>]).{8,20}$/,
      //   message:
      //     "Password must contain at least one letter and one special character",
      // },
    },
  };
  const onSubmit = async (data) => {
    setLoading(true);
    const result = await EduService.login(data);
    if (result.success) {
      setCookie("eduAuthToken", result.data.token, result.data.expireTime);
      setIsAuthen(true);
    } else {
      setIsAuthen(false);
    }
    setLoading(false);
  };
  return (
    <form
      className="flex-1 max-w-xl"
      onSubmit={handleSubmit(onSubmit)}
      action=""
    >
      <div className="space-y-6">
        <h3 className="text-xl font-medium text-gray-900 dark:text-white">
          Please signin to continue
        </h3>
        <div>
          <Input
            id="username"
            label="Username"
            register={register}
            type="text"
            rules={validationRules.username}
            errors={errors.username}
          />
          <Input
            id="password"
            label="Password"
            register={register}
            type="password"
            rules={validationRules.password}
            errors={errors.password}
          />
        </div>
        <div></div>

        <div className="w-full">
          <LoadingButton
            disabled={loading}
            isLoading={loading}
            className="w-full"
          >
            Signin
          </LoadingButton>
        </div>
      </div>
    </form>
  );
}

IdentityConfirmModal.propTypes = {
  setIsAuthen: PropTypes.func.isRequired,
};
