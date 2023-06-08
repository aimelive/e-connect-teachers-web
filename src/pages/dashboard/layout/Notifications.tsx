import React, { FC } from "react";
import { AppNotification } from "../../../interfaces/notification";
import { Link } from "react-router-dom";
import moment from "moment";

function _getNotificationDirection(
  type: string,
  actionId: string
): React.ReactNode {
  switch (type) {
    case "ASSIGN_USER_CLASS":
      return (
        <Link
          to={`/dashboard/time-table/${actionId}`}
          className="text-xs text-primary underline"
        >
          View Class
        </Link>
      );
    case "UNASSIGN_USER_CLASS":
      return null;
    case "ASSIGN_USER_SCHOOL":
      return (
        <Link
          to={`/dashboard/schools/${actionId}`}
          className="text-xs text-primary underline"
        >
          View School
        </Link>
      );
    case "UNASSIGN_USER_SCHOOL":
      return null;
    default:
      return null;
  }
}

function getNotificationTitle(action: string) {
  switch (action) {
    case "ASSIGN_USER_CLASS":
      return "Assigned to a new class";
    case "UNASSIGN_USER_CLASS":
      return "Unassigned from a class";
    case "ASSIGN_USER_SCHOOL":
      return "Assigned to a new school";
    case "UNASSIGN_USER_SCHOOL":
      return "Unassigned from a school";
    default:
      return "E-connect - Teaching Application";
  }
}

export const NotificationsPanel: FC<{ notifications: AppNotification[] }> = ({
  notifications,
}) => {
  return (
    <div className="sm:w-full lg:w-[400px] max-h-[80vh]   overflow-y-scroll scrollDiv">
      {notifications.length === 0 && <p>No recent notifications</p>}
      {notifications.map((notif, i) => (
        <div
          key={i}
          className={`p-4 text-sm rounded-md ${
            !notif.viewed && "bg-slate-100"
          }`}
        >
          <div className="flex space-x-4">
            <h1 className="font-bold flex-grow w-full">
              {getNotificationTitle(notif.data.action)}
              {getNotificationTitle(notif.data.action)}
            </h1>
            <p className="whitespace-nowrap text-slate-500">
              {moment(notif.createdAt).fromNow()}
            </p>
          </div>
          <p className="font-regular text-slate-600">{notif.data.message}</p>
          {_getNotificationDirection(notif.data.action, notif.data.actionId)}
          <hr className="mt-3" />
        </div>
      ))}
    </div>
  );
};
