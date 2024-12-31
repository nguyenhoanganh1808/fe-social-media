import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { SearchService } from "../services/search.service";
import { GroupService } from "../services/group.service";

export default function useFormCreateGroup() {
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
    await GroupService.createGroup(data);
    setLoading(false);
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
