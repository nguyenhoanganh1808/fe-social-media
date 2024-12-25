import { useForm } from "react-hook-form";
import { AuthService } from "../services/auth.service";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function useSignUpForm() {
  const {
    register,
    formState: { errors },
    handleSubmit,
    getValues,
  } = useForm();
  const navigate = useNavigate();

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
    delete data["confirmpassword"];

    try {
      await AuthService.register({ ...data, roleId: 2 });
      toast.success("Registration successful!");

      navigate("/auth/create-profile");
    } catch (error) {
      toast.error(error || "Registration error");
    }
  };

  return {
    register,
    handleSubmit,
    errors,
    onSubmit,
    validationRules,
  };
}
