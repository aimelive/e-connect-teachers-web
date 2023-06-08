import { collection, onSnapshot, query, where } from "firebase/firestore";
import React, { createContext, useContext, useEffect, useState } from "react";
import { firestore } from "../lib/config";
import { useCurrentUser } from "../lib/hooks/auth";
import { AppNotification } from "../interfaces/notification";

interface ContextValue {
  notifications: AppNotification[];
}

const NotificationContext = createContext<ContextValue>({ notifications: [] });

export const NotificationsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [notifications, setNotifications] = useState<AppNotification[]>([]);
  const { account } = useCurrentUser();

  useEffect(() => {
    const q = query(
      collection(firestore, "notifications"),
      where("to", "==", account?.id)
    );
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const notificationData: AppNotification[] = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data() as any;
        notificationData.push({
          ...data,
          createdAt: data.createdAt.toDate(),
        });
      });
      setNotifications(notificationData);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <NotificationContext.Provider value={{ notifications }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => {
  const { notifications } = useContext(NotificationContext);
  return {
    notifications,
    unread: notifications.filter((n) => !n.viewed).length,
  };
};
