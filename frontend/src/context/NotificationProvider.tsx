import { createContext, useContext, useState, useCallback } from "react";
import {
  NotificationContainer,
  type NotificationItem,
  type NotificationType,
} from "../components/ui/Notification";

type NotificationContextType = {
  addNotification: (
    message: string,
    type?: NotificationType,
    duration?: number,
  ) => void;
  removeNotification: (id: string) => void;
};

const NotificationContext = createContext<NotificationContextType | null>(null);

export function NotificationProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);

  const addNotification = useCallback(
    (message: string, type?: NotificationType, duration?: number) => {
      const id = crypto.randomUUID();
      setNotifications((prev) => [...prev, { id, message, type, duration }]);
    },
    [],
  );

  const removeNotification = useCallback((id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  }, []);

  return (
    <NotificationContext.Provider
      value={{ addNotification, removeNotification }}
    >
      {children}
      <NotificationContainer
        notifications={notifications}
        removeNotification={removeNotification}
      />
    </NotificationContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useNotification() {
  const ctx = useContext(NotificationContext);
  if (!ctx)
    throw new Error(
      "useNotification must be used within a NotificationProvider",
    );
  return ctx;
}
