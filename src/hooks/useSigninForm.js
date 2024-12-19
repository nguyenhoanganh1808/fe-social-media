import { useForm } from "react-hook-form";
import { AuthService } from "../services/auth.service";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { UserService } from "../services/user.service";
import { useState } from "react";

export default function useSignInForm() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
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
  };

  const onSubmit = async (data) => {
    console.log(data);
    setLoading(true);
    try {
      const response = await AuthService.login(data);
      console.log("response: ", response);
      toast.success("Login successful!");

      const user = await UserService.getProfile();
      if (user) {
        navigate("/posts");
      } else {
        navigate("/auth/create-profile");
      }
    } catch (error) {
      console.log("error: ", error);
      toast.error(error.message || "Login error");
    }
    setLoading(false);
  };

  return {
    loading,
    register,
    handleSubmit,
    errors,
    onSubmit,
    validationRules,
  };
}
