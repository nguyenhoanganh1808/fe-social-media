import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { SearchService } from "../services/search.service";
import { createUserProfile } from "../lib/utils";

export default function useFormCreateGroup(apiCall, onCloseModal) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [searchValue, setSearchValue] = useState("");
  const [filterUsers, setFilterUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const validationRules = {
    name: {
      required: "Group name is required",
    },
    chatGroupName: {
      required: "Group name is required",
    },
    description: {},
    members: {},
  };

  useEffect(() => {
    let timeoutId;

    const fetchData = async () => {
      const result = await SearchService.searchUser(searchValue);
      if (result.success && result.data) {
        console.log("result: ", result);
        setFilterUsers(result.data.map((user) => createUserProfile(user)));
      }
    };

    timeoutId = setTimeout(fetchData, 300);

    return () => clearTimeout(timeoutId);
  }, [searchValue]);

  const onSubmit = async (data) => {
    setLoading(true);
    const result = await apiCall(data);
    if (result.success) {
      onCloseModal();
    }
    setLoading(false);
    return result;
  };
  return {
    register,
    handleSubmit,
    onSubmit,
    errors,
    searchValue,
    setSearchValue,
    filterUsers,
    validationRules,
    loading,
  };
}
