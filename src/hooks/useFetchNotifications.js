import { useCallback, useEffect, useRef, useState } from "react";
import { NotificationService } from "../services/notification.service";
import { db } from "../config/firebase-config";
import {
  collection,
  doc,
  query,
  orderBy,
  limit,
  onSnapshot,
} from "firebase/firestore";
import { useAuth } from "./useAuthContext";
import { toast } from "react-toastify";
import ToastNotification from "../components/common/ToastNotification";

export default function useFetchNotifications() {
  const [notifications, setNotifications] = useState([]);
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const notificationListRef = useRef(null);
  const pageSize = 10;

  const fetchMoreNotifications = useCallback(async () => {
    if (!hasMore || isFetchingMore) return;

    setIsFetchingMore(true);
    const nextPage = currentPage + 1;
    const result = await NotificationService.getNotifications(
      nextPage,
      pageSize
    );

    if (result.success) {
      setNotifications((prevData) => [...prevData, ...result.data]);
      setCurrentPage(nextPage);
      setHasMore(result.data.length === pageSize);
    }
    setIsFetchingMore(false);
  }, [currentPage, hasMore, isFetchingMore]);

  useEffect(() => {
    async function fetch() {
      setLoading(true);
      const result = await NotificationService.getNotifications(0, pageSize);
      if (result.success) {
        setNotifications(result.data);
      }
      setLoading(false);
    }
    fetch();
  }, []);

  useEffect(() => {
    const notificationsRef = doc(db, "notifications", user.userId);
    const notificationRef = collection(notificationsRef, "user_notifications");
    const notificationQuery = query(
      notificationRef,
      orderBy("createdAt", "desc"),
      limit(1)
    );
    const allNotificationQuery = query(
      notificationRef,
      orderBy("createdAt", "desc"),
      limit(100)
    );

    const unsubscribeAllNoti = onSnapshot(
      allNotificationQuery,
      (snapshot) => {
        snapshot.docChanges().forEach((change) => {
          const newNotification = { id: change.doc.id, ...change.doc.data() };
          console.log("Notification updated:", newNotification);

          if (
            change.type === "modified" &&
            change.doc.data().isRead !== undefined
          ) {
            console.log("Notification updated:", newNotification);
            setNotifications((prevData) =>
              prevData.map((notif) =>
                notif.id === newNotification.id
                  ? { ...notif, isRead: newNotification.isRead }
                  : notif
              )
            );
          }
        });
      },
      (error) => {
        console.error("Error with Firestore listener:", error);
      }
    );

    const unsubscribe = onSnapshot(
      notificationQuery,
      (snapshot) => {
        snapshot.docChanges().forEach((change) => {
          const newNotification = { id: change.doc.id, ...change.doc.data() };
          if (change.type === "added") {
            console.log("New message added:", newNotification);
            setNotifications((prevData) => [newNotification, ...prevData]);
            toast(ToastNotification, { position: "bottom-right" });
          }
        });
      },
      (error) => {
        console.error("Error with Firestore listener:", error);
      }
    );

    return () => {
      unsubscribe();
      unsubscribeAllNoti();
    };
  }, [user.userId]);

  useEffect(() => {
    const handleScroll = () => {
      if (notificationListRef.current) {
        const { scrollTop, scrollHeight, clientHeight } =
          notificationListRef.current;
        if (scrollHeight - scrollTop <= clientHeight + 25) {
          fetchMoreNotifications();
        }
      }
    };

    const chatListElement = notificationListRef.current;
    if (chatListElement) {
      chatListElement.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (chatListElement) {
        chatListElement.removeEventListener("scroll", handleScroll);
      }
      setCurrentPage(0);
    };
  }, [fetchMoreNotifications]);

  return {
    notifications,
    loading,
    isFetchingMore,
    notificationListRef,
  };
}
