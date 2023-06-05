export interface MenuItem {
  title: string;
  icon: string;
  url: string;
}

export const menuItems: MenuItem[] = [
  {
    title: "Home",
    icon: "home",
    url: "/",
  },
  {
    title: "Schools",
    icon: "school",
    url: "/schools",
  },
  {
    title: "Users",
    icon: "user",
    url: "/users",
  },
  {
    title: "Messages",
    icon: "chat",
    url: "/messages",
  },
  {
    title: "Time Table",
    icon: "timetable",
    url: "/time-table",
  },
];
