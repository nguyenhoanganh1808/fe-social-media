import { useForm } from "react-hook-form";

export default function useSignInForm() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

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
        value:
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*(),.?":{}|<>]).{8,20}$/,
        message:
          "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
      },
    },
  };

  const onSubmit = (data) => {
    console.log(data);
  };

  return {
    register,
    handleSubmit,
    errors,
    onSubmit,
    validationRules,
  };
}
