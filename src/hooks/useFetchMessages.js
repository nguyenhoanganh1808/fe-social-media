import { useCallback, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { MessageService } from "../services/message.service";
import { db } from "../config/firebase-config";
import {
  collection,
  doc,
  query,
  orderBy,
  limit,
  onSnapshot,
} from "firebase/firestore";

export default function useFetchMessages() {
  const [messageData, setMessageData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const chatListRef = useRef(null);
  const pageSize = 10;

  const { id } = useParams();

  const scrollToBottom = () => {
    if (chatListRef.current) {
      chatListRef.current.scrollTop = chatListRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    async function fetch() {
      const result = await MessageService.getMessage(id, 0, pageSize);
      if (result.success) {
        setMessageData(result.data);
      }
      setLoading(false);
    }
    fetch();
  }, [id]);

  useEffect(() => {
    if (!loading && messageData.length > 0 && currentPage === 0) {
      scrollToBottom();
    }
  }, [loading, messageData, currentPage]);

  const fetchMoreMessages = useCallback(async () => {
    if (!hasMore || isFetchingMore) return;

    if (!chatListRef.current) return;

    // Store the current scroll position and height
    const chatList = chatListRef.current;
    const previousScrollHeight = chatList.scrollHeight;
    const previousScrollTop = chatList.scrollTop;

    const nextPage = currentPage + 1;
    setIsFetchingMore(true);
    const result = await MessageService.getMessage(id, nextPage, pageSize);

    if (result.success) {
      setMessageData((prevData) => [...prevData, ...result.data]);
      setCurrentPage(nextPage);
      setHasMore(result.data.length === pageSize);

      requestAnimationFrame(() => {
        chatList.scrollTop =
          chatList.scrollHeight - previousScrollHeight + previousScrollTop;
      });
    }
    setIsFetchingMore(false);
  }, [hasMore, id, isFetchingMore, currentPage]);

  useEffect(() => {
    const conversationRef = doc(db, "conversations", id);
    const messagesRef = collection(conversationRef, "messages");
    const messagesQuery = query(
      messagesRef,
      orderBy("createdAt", "desc"),
      limit(1)
    );

    const unsubscribe = onSnapshot(
      messagesQuery,
      (snapshot) => {
        snapshot.docChanges().forEach((change) => {
          if (change.type === "added") {
            const newMessage = { id: change.doc.id, ...change.doc.data() };
            setMessageData((prevData) => [newMessage, ...prevData]);
            scrollToBottom();
          }
        });
      },
      (error) => {
        console.error("Error with Firestore listener:", error);
      }
    );

    return () => unsubscribe();
  }, [id]);

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
    setMessageData,
  };
}
