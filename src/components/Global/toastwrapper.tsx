import { FC } from "react";
import { Outlet } from "react-router-dom";
import type { Notification } from "../../providers/GlobalContext";
import useGlobalCtx from "../../providers/GlobalContext";

interface ToastProps {
  notification: Notification | null;
  setNotification: (value: Notification | null) => void;
}
export const Toast: FC<ToastProps> = ({ notification, setNotification }) => {
  return (
    <div className="fixed px-4 top-4  z-50 w-screen bg-transparent flex  justify-center">
      <div
        id="toast"
        className={`px-6 py-2  rounded-xl  text-slate-800 shadow-2xl  border  flex items-center gap-4 ${
          notification == null ? "-mr-[30vw]" : "-mr-0"
        } msm:w-full duration-200 transition-all z-40`}
        style={{
          display:
            notification && notification.message.trim() != "" ? "flex" : "flex",
          backgroundColor:
            notification?.type == "error" ? "#fca5a5" : "#bbf7d0",
        }}
      >
        <span className="w-fit">{notification?.message}</span>
        <button onClick={() => setNotification(null)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="black"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-4 h-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
              stroke="black"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default function ToastWrapper() {
  const { notification, setNotificationHandler } = useGlobalCtx();
  return (
    <>
      {notification !== null && (
        <Toast
          notification={notification}
          setNotification={setNotificationHandler}
        />
      )}
      <Outlet />
    </>
  );
}
