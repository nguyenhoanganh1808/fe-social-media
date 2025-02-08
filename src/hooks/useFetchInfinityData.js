import { useCallback, useEffect, useRef, useState } from "react";

export default function useFetchInfinityData(fetchApi) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const container = useRef(null);

  const pageSize = 10;

  // Fetch initial data
  useEffect(() => {
    async function fetch() {
      setLoading(true);
      const result = await fetchApi(0, pageSize);
      if (result.success) {
        setData(result.data);
        setHasMore(result.data.length === pageSize); // Set hasMore based on the initial fetch
      }
      setLoading(false);
    }
    fetch();
  }, [fetchApi]);

  // Fetch more data
  const fetchMoreData = useCallback(async () => {
    if (!hasMore || isFetchingMore) return;

    setIsFetchingMore(true);

    const result = await fetchApi(currentPage + 1, pageSize); // Increment page and pass args

    if (result.success) {
      setData((prevData) => [...prevData, ...result.data]);
      setCurrentPage((prevPage) => prevPage + 1);
      setHasMore(result.data.length === pageSize); // Update hasMore based on the new data
    }

    setIsFetchingMore(false);
  }, [currentPage, fetchApi, hasMore, isFetchingMore]);

  // Add scroll event listener
  useEffect(() => {
    const handleScroll = () => {
      if (container.current) {
        const { scrollTop, scrollHeight, clientHeight } = container.current;
        const scrollPosition = Math.ceil(scrollTop + clientHeight);

        // Fetch more data when the user is near the bottom
        if (scrollPosition >= scrollHeight - 50) {
          fetchMoreData();
        }
      }
    };

    const chatListElement = container.current;
    if (chatListElement) {
      chatListElement.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (chatListElement) {
        chatListElement.removeEventListener("scroll", handleScroll);
      }
    };
  }, [fetchMoreData]);

  return {
    data,
    loading,
    container,
    setData,
  };
}
