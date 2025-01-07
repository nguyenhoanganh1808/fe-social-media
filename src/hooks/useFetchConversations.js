import { useCallback, useEffect, useState } from "react";
import { MessageService } from "../services/message.service";
import { toast } from "react-toastify";

export default function useFetchConversations() {
  const [conversations, setConversations] = useState([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const fetchConversations = useCallback(async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    try {
      const result = await MessageService.getMessages(page, 10);

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
    } catch (e) {
      toast.error(e.message || "An error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  }, [hasMore, loading, page]);

  useEffect(() => {
    if (page === 0 && hasMore) {
      fetchConversations();
    }
  }, [fetchConversations, hasMore, page]);

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
  };
}
