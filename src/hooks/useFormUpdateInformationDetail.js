import { useForm } from "react-hook-form";
import { useAuth } from "./useAuthContext";
import ProfileService from "../services/profile.service";
import { useState } from "react";

export default function useFormUpdateInformationDetail() {
  const { user, setUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: {
      fullName: user.informationDetail.fullName,
      schoolYear: user.informationDetail.schoolYear,
      activityClass: user.informationDetail.activityClass,
      work: user.informationDetail.work ? user.informationDetail.work[0] : "",
      currentCity: user.informationDetail.currentCity,
      homeTown: user.informationDetail.homeTown,
    },
  });

  const validationRules = {
    fullName: {
      required: "Full name is required",
      minLength: {
        value: 2,
        message: "Full name must be at least 2 characters long",
      },
      maxLength: {
        value: 100,
        message: "Full name must be no more than 100 characters long",
      },
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

    work: {
      minLength: {
        value: 1,
        message: "Activity class must be at least 1 characters long",
      },
      maxLength: {
        value: 100,
        message: "Activity class must be no more than 100 characters long",
      },
    },

    currentCity: {
      minLength: {
        value: 2,
        message: "Current city must be at least 2 characters long",
      },
      maxLength: {
        value: 100,
        message: "Current city must be no more than 100 characters long",
      },
    },
    homeTown: {
      minLength: {
        value: 2,
        message: "Hometown must be at least 2 characters long",
      },
      maxLength: {
        value: 100,
        message: "Hometown must be no more than 100 characters long",
      },
    },
  };

  const onSubmit = async (data) => {
    setLoading(true);
    const newData = { ...data, work: [data.work] };
    const result = await ProfileService.updateInformationDetail(newData);
    if (result.success) {
      setUser((prev) => ({
        ...prev,
        informationDetail: {
          ...prev.informationDetail,
          ...newData,
        },
      }));
    }
    setLoading(false);
  };

  return {
    register,
    errors,
    handleSubmit,
    validationRules,
    onSubmit,
    loading,
  };
}
