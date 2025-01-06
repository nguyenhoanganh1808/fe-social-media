import { useEffect, useState } from "react";

export default function useSearch(apiCall, defaultResult) {
  const [searchValue, setSearchValue] = useState("");
  const [searchResults, setSearchResults] = useState(defaultResult);
  const [isShowResult, setIsShowResult] = useState(true);

  useEffect(() => {
    const timeoutId = setTimeout(async () => {
      const result = await apiCall(searchValue);
      if (result.success) {
        setSearchResults(result.data);
      } else {
        setSearchResults([]);
      }
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchValue, apiCall]);

  return {
    searchValue,
    setSearchValue,
    searchResults,
    isShowResult,
    setIsShowResult,
  };
}
