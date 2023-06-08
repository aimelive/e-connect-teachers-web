import { Outlet, Link } from "react-router-dom";
import Logo from "../../../components/ui/logo";
import { useState } from "react";
import { Drawer, Popover } from "antd";
import { useCurrentUser } from "../../../lib/hooks/auth";
import { useNotifications } from "../../../providers/NotificationsProvider";
import { MenuItem, menuItems } from "./data/menuItems";
import { NotificationsPanel } from "./Notifications";
import { UserProfilePanel } from "./UserProfilePanel";
import Badge from "../messages/Badge";

export default function DashboardLayout() {
  const { account } = useCurrentUser();
  const { notifications: userNotifications, unread } = useNotifications();
  const [activeItem, setActiveItem] = useState<MenuItem>(menuItems[0]);
  const [showModal, setShowModal] = useState(false);

  const NavBar = (
    <>
      <div>
        <Logo />
        <div className="flex flex-col mt-8 md:px-4">
          {menuItems.map((item, index) => {
            const isActive = activeItem.url === item.url;
            return (
              <Link
                className={`font-medium transition capitalize flex items-center space-x-4 p-3 hover:opacity-60 ${
                  !isActive ? "" : "shadow"
                }`}
                key={index}
                to={`/dashboard${item.url}`}
                onClick={() => {
                  setActiveItem(item);
                  if (showModal) {
                    setShowModal(false);
                  }
                }}
              >
                <img
                  src={`/icons/menu/${item.icon}.svg`}
                  alt={item.title}
                  className="w-4 h-4 fill-primary"
                />
                <span className="flex-grow">{item.title}</span>
                {item.url === "/messages" && <Badge />}
              </Link>
            );
          })}
        </div>
      </div>
      <div className="w-full border-t py-4 text-center text-xs">
        &copy; E-connect - 2023
      </div>
    </>
  );

  return (
    <div className="flex bg-brand/5">
      <div className="h-screen sticky justify-between bg-white top-0 md:flex flex-col border hidden min-w-[240px] w-fit">
        {NavBar}
      </div>
      <Drawer
        open={showModal}
        onClose={() => setShowModal(false)}
        placement="left"
        closable={false}
        className="md:hidden"
        contentWrapperStyle={{ width: "80%" }}
        maskClassName="md:hidden"
        rootClassName="md:hidden"
      >
        <div className="h-full flex flex-col justify-between">{NavBar}</div>
      </Drawer>
      <div className="flex flex-col gap-0 w-full">
        <nav className="py-4 flex items-center justify-between px-4 capitalize bg-white shadow-sm shadow-slate-100 sticky  top-0 w-full z-30">
          <div
            className="md:hidden"
            onClick={() => setShowModal((prev) => !prev)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5"
              />
            </svg>
          </div>
          <span className="text-lg font-bold text-brand">
            {activeItem.title === "Home" ? "Dashboard" : activeItem.title}
          </span>
          <div
            className="flex items-center gap-4  cursor-pointer  p-1 rounded-full"
            title="User profile"
          >
            <Popover
              className="shadow-none"
              style={{ boxShadow: "none" }}
              content={<NotificationsPanel notifications={userNotifications} />}
              title="Notifications"
              placement="top"
              trigger="click"
            >
              <button className="relative">
                <img
                  src="/icons/notification.svg"
                  alt="#"
                  className="opacity-60"
                />
                {unread && (
                  <div className="bg-red-600 w-4 h-4 rounded-full flex items-center justify-center text-xs text-white absolute -top-1 -right-1 z-10">
                    {unread}
                  </div>
                )}
                <div className="w-2 h-2 rounded border border-white bg-red-500 absolute right-0 top-0" />
              </button>
            </Popover>
            <Popover
              className="shadow-none"
              style={{ boxShadow: "none" }}
              content={<UserProfilePanel />}
              title="User Profile"
              placement="top"
              trigger="click"
            >
              <div className="flex items-center gap-2  cursor-pointer hover:bg-gray-100 p-1 pr-3 rounded-full">
                <img
                  src={account?.profile_pic}
                  width={34}
                  height={34}
                  alt={account?.names}
                  className="rounded-full border bg-gray-50 h-10 w-10"
                />
                <span className="font-medium text-brand hidden md:block">
                  {account?.names}
                </span>
              </div>
            </Popover>
          </div>
        </nav>
        <div className="p-4 max-w-full h-full">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
