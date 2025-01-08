import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { SearchService } from "../services/search.service";

export default function useFormCreateGroup(apiCall) {
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
        setFilterUsers(result.data);
      }
    };

    timeoutId = setTimeout(fetchData, 300);

    return () => clearTimeout(timeoutId);
  }, [searchValue]);

  const onSubmit = async (data) => {
    setLoading(true);
    const result = await apiCall(data);
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
