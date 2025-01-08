import { useCallback, useEffect, useState } from "react";
import { MessageService } from "../services/message.service";

export default function useFetchConversations() {
  const [conversations, setConversations] = useState([]);
  const [pendingConversations, setPendingConversations] = useState([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isLoadingPending, setIsLoadingPending] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const fetchConversations = useCallback(async () => {
    if (!hasMore) return;

    const result = await MessageService.getMessages(page, 10);
    setLoading(false);

    if (result.success) {
      setConversations((prevCon) => {
        const conversationsMap = new Map(
          prevCon.map((conversation) => [conversation.id, conversation])
        );
        result.data.forEach((newconversation) => {
          if (!conversationsMap.has(newconversation.id)) {
            conversationsMap.set(newconversation.id, newconversation);
          }
        });
        return Array.from(conversationsMap.values());
      });

      setPage((prevPage) => prevPage + 1);
      if (result.data.length < 10) {
        setHasMore(false);
      }
    }
  }, [hasMore, page]);

  useEffect(() => {
    if (page === 0 && hasMore) {
      fetchConversations();
    }
  }, [fetchConversations, hasMore, page]);

  useEffect(() => {
    async function fetchPendingConversations() {
      setIsLoadingPending(true);
      const result = await MessageService.getPendingMessages();
      if (result.success) {
        setPendingConversations(result.data);
      }
      setIsLoadingPending(false);
    }
    fetchPendingConversations();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight
      ) {
        fetchConversations();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [fetchConversations]);

  return {
    loading,
    conversations,
    pendingConversations,
    isLoadingPending,
  };
}
