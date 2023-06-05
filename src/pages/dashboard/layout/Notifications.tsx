import { FC } from "react";
import { AppNotification } from "../../../interfaces/notification";

export const NotificationsPanel: FC<{ notifications: AppNotification[] }> = ({
  notifications,
}) => {
  return (
    <div className="sm:w-full lg:w-[400px] max-h-[80vh]   overflow-y-scroll scrollDiv">
      {notifications.length === 0 && <p>No recent notifications</p>}
      {notifications.map((notif, i) => (
        <div key={i} className="p-4 text-sm rounded-md mb-">
          <h1 className="font-bold">{notif.data.action}</h1>
          <p className="font-regular text-slate-600">{notif.data.message}</p>
          <hr className="mt-3" />
        </div>
      ))}
    </div>
  );
};
