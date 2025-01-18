import { useEffect, useState } from "react";

export default function useFetch(apiCall) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetch() {
      setLoading(true);
      const result = await apiCall();
      if (result.success) {
        setData(result.data);
      }
      setLoading(false);
    }
    fetch();
  }, [apiCall]);
  return {
    data,
    loading,
  };
}
