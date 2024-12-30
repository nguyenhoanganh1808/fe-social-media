import { useForm } from "react-hook-form";
import { useAuth } from "../hooks/useAuthContext";
import { useState } from "react";
import ProfileService from "../services/profile.service";

export default function useFormUpdateContact() {
  const { user, setUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: {
      email: user.contact.email,
      phone: user.contact.phoneNumber,
      address: user.contact.address,
    },
  });

  const validationRules = {
    phone: {
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
    email: {
      required: "Email is required",
      pattern: {
        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        message: "Please enter a valid email address",
      },
    },
  };

  const onSubmit = async (data) => {
    setLoading(true);
    const newContact = {
      emailToContact: data.email,
      phoneNumber: data.phone,
      address: data.address,
    };
    const result = await ProfileService.updateContact(newContact);
    if (result.success) {
      setUser((prevUser) => ({
        ...prevUser,
        contact: { ...data, phoneNumber: data.phone },
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
