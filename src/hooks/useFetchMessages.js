import { useCallback, useEffect, useRef, useState } from "react";
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
import { ChatbotService } from "../services/chatbot.service";

export default function useFetchMessages({
  conversationId,
  collectionPath,
  pageSize = 10,
}) {
  const [messageData, setMessageData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const chatListRef = useRef(null);
  const isFetchChatbot = conversationId === "chat-bot";

  useEffect(() => {
    async function fetch() {
      setLoading(true);
      let result;
      if (isFetchChatbot) {
        result = await ChatbotService.getMessages(0, pageSize);
      } else {
        result = await MessageService.getMessage(
          collectionPath,
          conversationId,
          0,
          pageSize
        );
      }

      if (result.success) {
        setMessageData(result.data);
        setHasMore(result.data.length === pageSize);
      }
      setLoading(false);
      requestAnimationFrame(() => {
        if (chatListRef.current) {
          chatListRef.current.scrollTop = chatListRef.current.scrollHeight;
        }
      });
    }
    fetch();
  }, [conversationId, pageSize, collectionPath, isFetchChatbot]);

  const fetchMoreMessages = useCallback(async () => {
    if (!hasMore || isFetchingMore || !chatListRef.current) return;

    const chatList = chatListRef.current;
    const previousScrollHeight = chatList.scrollHeight;
    const previousScrollTop = chatList.scrollTop;

    setIsFetchingMore(true);

    try {
      let result;
      if (isFetchChatbot) {
        result = await ChatbotService.getMessages(currentPage + 1, pageSize);
      } else {
        result = await MessageService.getMessage(
          collectionPath,
          conversationId,
          currentPage + 1,
          pageSize
        );
      }
      if (result.success) {
        setMessageData((prevData) => [...prevData, ...result.data]);
        setHasMore(result.data.length === pageSize);
        setCurrentPage((prevPage) => prevPage + 1);

        // Adjust scroll position after fetching
        requestAnimationFrame(() => {
          chatList.scrollTop =
            chatList.scrollHeight - previousScrollHeight + previousScrollTop;
        });
      }
    } catch (error) {
      console.error("Error fetching messages:", error);
    } finally {
      setIsFetchingMore(false);
    }
  }, [
    hasMore,
    isFetchingMore,
    collectionPath,
    conversationId,
    currentPage,
    pageSize,
    isFetchChatbot,
  ]);

  useEffect(() => {
    if (isFetchChatbot) return;
    const conversationRef = doc(db, collectionPath, conversationId);
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
            setMessageData((prevData) => {
              const updatedData = [newMessage, ...prevData];

              requestAnimationFrame(() => {
                if (chatListRef.current) {
                  chatListRef.current.scrollTop =
                    chatListRef.current.scrollHeight;
                }
              });

              return updatedData;
            });
          }
        });
      },
      (error) => {
        console.error("Error with Firestore listener:", error);
      }
    );

    return () => unsubscribe();
  }, [conversationId, collectionPath, isFetchChatbot]);

  useEffect(() => {
    const handleScroll = () => {
      if (chatListRef.current) {
        const { scrollTop } = chatListRef.current;
        if (scrollTop <= 0) {
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
  }, [fetchMoreMessages]);

  return {
    messageData,
    loading,
    isFetchingMore,
    chatListRef,
    setMessageData,
  };
}
