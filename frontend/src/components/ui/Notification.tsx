import { useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import { CheckCircle, X, AlertCircle, Info, AlertTriangle } from "lucide-react";

export type NotificationType = "success" | "error" | "info" | "warning";

export type NotificationItem = {
  id: string;
  message: string;
  type?: NotificationType;
  duration?: number; // ms
};

type NotificationProps = {
  notifications: NotificationItem[];
  removeNotification: (id: string) => void;
};

const icons: Record<NotificationType, React.ReactNode> = {
  success: <CheckCircle className="h-5 w-5 text-emerald-500" />,
  error: <AlertCircle className="h-5 w-5 text-red-500" />,
  info: <Info className="h-5 w-5 text-blue-500" />,
  warning: <AlertTriangle className="h-5 w-5 text-amber-500" />,
};

const styles: Record<NotificationType, string> = {
  success: "outline outline-neutral-300 bg-white",
  error: "border border-red-500 bg-white",
  info: "border border-blue-500 bg-white",
  warning: "border border-amber-500 bg-white",
};

const progressColors: Record<NotificationType, string> = {
  success: "bg-emerald-500",
  error: "bg-red-500",
  info: "bg-blue-500",
  warning: "bg-amber-500",
};

function SingleNotification({
  notification,
  onRemove,
}: {
  notification: NotificationItem;
  onRemove: () => void;
}) {
  const type = notification.type ?? "success";
  const duration = notification.duration ?? 4000;

  useEffect(() => {
    const timer = setTimeout(onRemove, duration);
    return () => clearTimeout(timer);
  }, [duration, onRemove]);

  return (
    <motion.div
      layout
      initial={{ x: "-100%", opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: "-100%", opacity: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className={`relative flex w-80 items-start gap-3 rounded-xl px-4 py-3 shadow-lg ${styles[type]}`}
    >
      <div className="mt-0.5 shrink-0">{icons[type]}</div>

      <p className="flex-1 text-sm font-medium text-gray-800">
        {notification.message}
      </p>

      <button
        onClick={onRemove}
        className="mt-0.5 shrink-0 rounded p-0.5 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
      >
        <X className="h-4 w-4" />
      </button>

      {/* Progress bar */}
      <div className="absolute right-0 bottom-0 left-1 h-1 overflow-hidden rounded-b-xl">
        <motion.div
          className={`h-full origin-left ${progressColors[type]}`}
          initial={{ scaleX: 1 }}
          animate={{ scaleX: 0 }}
          transition={{ duration: duration / 1000, ease: "linear" }}
        />
      </div>
    </motion.div>
  );
}

export function NotificationContainer({
  notifications,
  removeNotification,
}: NotificationProps) {
  return (
    <div className="fixed top-22 left-4 z-60 flex flex-col gap-3">
      <AnimatePresence mode="popLayout">
        {notifications.map((notification) => (
          <SingleNotification
            key={notification.id}
            notification={notification}
            onRemove={() => removeNotification(notification.id)}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}
