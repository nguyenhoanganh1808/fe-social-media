import { useForm } from "react-hook-form";
import { useAuth } from "../hooks/useAuthContext";
import { useState } from "react";
import ProfileService from "../services/profile.service";

export default function useFormUpdateProfile() {
  const { user, setUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: {
      studentCode: user.studentCode,
      nickName: user.nickName,
      tagName: user.tagName,
      gender: user.gender,
    },
  });

  const validationRules = {
    studentCode: {
      required: "Student code is required",
      minLength: {
        value: 8,
        message: "Student code must be at least 8 characters long",
      },
      maxLength: {
        value: 8,
        message: "Student code must be no more than 8 characters long",
      },
    },
    nickName: {
      required: "Nickname is required",
      minLength: {
        value: 8,
        message: "Nickname must be at least 8 characters long",
      },
      maxLength: {
        value: 100,
        message: "Nickname must be no more than 100 characters long",
      },
    },
    tagName: {
      required: "Tag name is required",
      minLength: {
        value: 5,
        message: "Tag name must be at least 5 characters long",
      },
      maxLength: {
        value: 100,
        message: "Tag name must be no more than 100 characters long",
      },
    },
    gender: {
      required: "Gender is required",
    },
  };

  const onSubmit = async (data) => {
    setLoading(true);
    const result = await ProfileService.updateProfile(data);
    if (result.success) {
      setUser((prevUser) => ({
        ...prevUser,
        studentCode: data.studentCode,
        nickName: data.nickName,
        tagName: data.tagName,
        gender: data.gender,
      }));
    }
    setLoading(false);
  };

  return {
    loading,
    register,
    errors,
    onSubmit,
    validationRules,
    handleSubmit,
  };
}
