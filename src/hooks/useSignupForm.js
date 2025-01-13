import { useForm } from "react-hook-form";
import { AuthService } from "../services/auth.service";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { roleData } from "../components/Login/FormSignup/RolesData";

export default function useSignUpForm() {
  const {
    register,
    formState: { errors },
    handleSubmit,
    getValues,
  } = useForm({
    defaultValues: {
      roleId: roleData.Lecture.key,
    },
  });
  const navigate = useNavigate();
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
    email: {
      required: "Email is required",
      pattern: {
        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        message: "Please enter a valid email address",
      },
    },

    password: {
      required: "Password is required",
      minLength: {
        message: "Password must be at least 8 characters long",
        value: 8,
      },
      maxLength: {
        message: "Password must be no more than 20 characters long",
        value: 20,
      },
      pattern: {
        value: /^(?=.*[a-zA-Z])(?=.*[!@#$%^&*(),.?":{}|<>]).{8,20}$/,
        message:
          "Password must contain at least one letter and one special character",
      },
    },
    confirmpassword: {
      required: "Please confirm your password",
      validate: (value) =>
        value === getValues("password") || "Passwords do not match",
    },
  };

  const onSubmit = async (data) => {
    console.log(data);
    delete data["confirmpassword"];
    setLoading(true);
    const registerData = { ...data, roleId: parseInt(data.roleId) };
    const result = await AuthService.register(registerData);
    if (result.success) {
      navigate("/auth/otp-confirmation", { state: registerData });
    }

    setLoading(false);
  };

  return {
    register,
    handleSubmit,
    loading,
    errors,
    onSubmit,
    validationRules,
  };
}
