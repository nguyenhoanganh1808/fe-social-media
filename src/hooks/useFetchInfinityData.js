import { useCallback, useEffect, useRef, useState } from "react";

export default function useFethcInfinityData(fetchApi) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const container = useRef(null);

  const pageSize = 10;

  useEffect(() => {
    async function fetch() {
      setLoading(true);
      const result = await fetchApi(0, pageSize);
      if (result.success) {
        setData(result.data);
      }
      setLoading(false);
    }
    fetch();
  }, [fetchApi]);

  const fetchMoreData = useCallback(async () => {
    if (!hasMore || isFetchingMore) return;

    setIsFetchingMore(true);

    const result = await fetchApi(currentPage, pageSize);

    if (result.success) {
      setData((prevData) => [...prevData, ...result.data]);
      setCurrentPage((prevPage) => prevPage + 1);
      setHasMore(result.data.length === pageSize);
    }
    setIsFetchingMore(false);
  }, [currentPage, fetchApi, hasMore, isFetchingMore]);

  useEffect(() => {
    const handleScroll = () => {
      console.log("trigger");
      if (container.current) {
        const { scrollTop, scrollHeight, clientHeight } = container.current;
        const scrollPosition = Math.ceil(scrollTop + clientHeight);

        // Debug information
        console.log({
          scrollTop,
          scrollHeight,
          clientHeight,
          scrollPosition,
          threshold: scrollHeight - 50,
          isNearBottom: scrollPosition >= scrollHeight - 50,
        });

        if (scrollPosition >= scrollHeight - 50) {
          console.log("fetch more notifications");
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
  };
}
