import { useEffect, useState } from "react";

export default function useSearch(apiCall) {
  const [searchValue, setSearchValue] = useState("");
  const [searchResults, setSearchResults] = useState({
    groups: [],
    users: [],
    posts: [],
  });

  useEffect(() => {
    async function filter() {
      if (searchValue.length > 0) {
        const result = await apiCall(searchValue);
        if (result.success) {
          setSearchResults(result.data);
        }
      }
    }
    filter();
  }, [searchValue, apiCall]);

  return {
    searchValue,
    setSearchValue,
    searchResults,
  };
}
