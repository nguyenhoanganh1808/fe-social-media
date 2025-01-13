import { useForm } from "react-hook-form";
import { UserService } from "../services/user.service";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { roleData } from "../components/Login/FormSignup/RolesData";

export default function useFormCreateProfile(role) {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: {
      major: "Information Technology",
    },
  });
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

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
    lectureCode: {
      required: "Lecture code is required",
      minLength: {
        value: 8,
        message: "Lecture code must be at least 8 characters long",
      },
      maxLength: {
        value: 8,
        message: "Lecture code must be no more than 8 characters long",
      },
    },
    nickName: {
      required: "Nickname is required",
      minLength: {
        value: 4,
        message: "Nickname must be at least 4 characters long",
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
    department: {
      required: "Department is required",
    },
    yearOfAdmission: {
      required: "Year of admission is required",
      min: {
        value: 2000,
        message: "School year must be at least 2000",
      },
      max: {
        value: new Date().getFullYear(),
        message: "School year must not exceed current date",
      },
    },
    className: {
      required: "Class name is required",
      minLength: {
        value: 5,
        message: "Class name must be at least 5 characters long",
      },
      maxLength: {
        value: 100,
        message: "Class name must be no more than 100 characters long",
      },
    },
    officeLocation: {
      required: "Office location is required",
      minLength: {
        value: 5,
        message: "Office location must be at least 5 characters long",
      },
      maxLength: {
        value: 100,
        message: "Office location must be no more than 100 characters long",
      },
    },
    yearsOfExperience: {
      required: "Year of Experience is required",
      min: {
        value: 1,
        message: "Year of Experience must be at least 1",
      },
      max: {
        value: 90,
        message: "Year of Experience must not exceed 90",
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
    setLoading(true);
    let profileData = {
      nickName: data.nickName,
      tagName: data.tagName,
      gender: data.gender,
      birthday: data.birthday,
      phoneNumber: data.phoneNumber,
      address: data.address,
    };
    if (role === roleData.Lecture.key) {
      profileData = {
        ...profileData,
        lecture: {
          lectureCode: data.lectureCode,
          department: data.department,
          officeLocation: data.officeLocation,
          yearsOfExperience: parseInt(data.yearsOfExperience),
        },
      };
    } else if (role === roleData.Student.key) {
      profileData = {
        ...profileData,
        student: {
          studentCode: data.studentCode,
          major: data.major,
          className: data.className,
          yearOfAdmission: parseInt(data.yearOfAdmission),
        },
      };
    }
    console.log(profileData);
    const result = await UserService.createProfile(profileData);
    if (result.success) {
      navigate("/");
    }
    setLoading(false);
  };

  return {
    register,
    handleSubmit,
    errors,
    loading,
    onSubmit,
    validationRules,
  };
}
