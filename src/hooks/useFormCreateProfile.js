import { useForm } from "react-hook-form";
import { UserService } from "../services/user.service";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function useFormCreateProfile() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const navigate = useNavigate();

  const validationRules = {
    code: {
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
    major: {
      required: "Major is required",
    },
    schoolYear: {
      required: "School year is required",
      min: {
        value: 1,
        message: "School year must be at least 1",
      },
      max: {
        value: 8,
        message: "School year must not exceed 8",
      },
    },
    activityClass: {
      required: "Activity class is required",
      minLength: {
        value: 5,
        message: "Activity class must be at least 5 characters long",
      },
      maxLength: {
        value: 100,
        message: "Activity class must be no more than 100 characters long",
      },
    },
    birthday: {},
    phoneNumber: {
      pattern: {
        value: /^[0-9]{10,15}$/,
        message: "Phone number must be 10-15 digits long",
      },
    },
    address: {
      minLength: {
        value: 10,
        message: "Address must be at least 10 characters long",
      },
      maxLength: {
        value: 200,
        message: "Address must be no more than 200 characters long",
      },
    },
  };

  const onSubmit = async (data) => {
    try {
      await UserService.createProfile(data);
      navigate("/posts");
    } catch (e) {
      toast.error(e || "Something went wrong");
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
