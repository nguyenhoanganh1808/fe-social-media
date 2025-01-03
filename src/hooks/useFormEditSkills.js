import { useFieldArray, useForm } from "react-hook-form";
import { useAuth } from "./useAuthContext";
import ProfileService from "../services/profile.service";
import { useState } from "react";

export default function useFormEditSkills() {
  const { user, setUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const { control, register, handleSubmit } = useForm({
    defaultValues: {
      skills: user.skills?.map((skill) => ({ value: skill })),
    },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "skills",
  });

  const onSubmit = async (data) => {
    setLoading(true);
    const newSkills = data.skills.map((skill) => ({
      name: skill.value,
      description: "",
      rate: 0,
    }));
    const result = await ProfileService.addSkill(newSkills);
    if (result.success) {
      setUser({ ...user, skills: newSkills });
    }
    setLoading(false);
  };

  return {
    fields,
    loading,
    append,
    register,
    handleSubmit,
    onSubmit,
    remove,
  };
}
