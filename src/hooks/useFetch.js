import { useEffect, useState } from "react";

export default function useFetch(apiCall) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    async function fetch() {
      const result = await apiCall();
      if (result.success) {
        setData(result.data);
      }
    }
    fetch();
    setLoading(false);
  }, [apiCall]);
  return {
    data,
    loading,
  };
}
