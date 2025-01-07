import { useCallback, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { MessageService } from "../services/message.service";

export default function useFetchMessages() {
  const [messageData, setMessageData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const chatListRef = useRef(null);
  const pageSize = 10;

  const { id } = useParams();

  useEffect(() => {
    async function fetch() {
      setLoading(true);
      const result = await MessageService.getMessage(id, 0, 10);
      if (result.success) {
        setMessageData(result.data);
        setHasMore(result.data.length === pageSize);
      }
      setLoading(false);
    }
    fetch();
  }, [id]);

  const fetchMoreMessages = useCallback(async () => {
    if (!hasMore || isFetchingMore) return;

    setIsFetchingMore(true);
    const nextPage = currentPage + 1;
    const result = await MessageService.getMessage(id, nextPage, pageSize);

    if (result.success) {
      setMessageData((prevData) => [...prevData, ...result.data]);
      setCurrentPage(nextPage);
      setHasMore(result.data.length === pageSize);
    }
    setIsFetchingMore(false);
  }, [hasMore, id, isFetchingMore, currentPage]);

  useEffect(() => {
    const handleScroll = () => {
      if (chatListRef.current) {
        const { scrollTop } = chatListRef.current;
        if (scrollTop <= 5) {
          fetchMoreMessages();
        }
      }
    };

    const chatListElement = chatListRef.current;
    if (chatListElement) {
      chatListElement.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (chatListElement) {
        chatListElement.removeEventListener("scroll", handleScroll);
      }
    };
  }, [messageData, fetchMoreMessages]);
  return {
    messageData,
    loading,
    isFetchingMore,
    chatListRef,
  };
}
