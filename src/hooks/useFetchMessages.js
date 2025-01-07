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
            console.log("New message added:", newMessage);
            setMessageData((prevData) => [newMessage, ...prevData]);
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
      setCurrentPage(0);
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
