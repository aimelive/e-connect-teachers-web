import { ChatMessage, UserChatMessage } from "../interfaces/chat";

export enum Role {
  Teacher,
  Assistant,
  PoManager,
  Admin,
}

export default class Utils {
  static compareObj(obj1: any, obj2: any) {
    return Object.entries(obj2).reduce((acc: any, [key, value]) => {
      if (obj1[key] !== value) {
        acc[key] = value;
      }
      return acc;
    }, {});
  }
  static groupChatsByUser(
    currentUser: string,
    chats: ChatMessage[]
  ): UserChatMessage[] {
    const groupedChats: UserChatMessage[] = [];
    for (const chat of chats) {
      try {
        const user = {
          unread: chats.filter(
            (el) =>
              el.groupInfo.id === chat.groupInfo.id &&
              !el.views.includes(currentUser)
          ).length,
          latestMessage: chats
            .filter((el) => el.groupInfo.id === chat.groupInfo.id)
            .slice(-1)[0],
        };

        const index = groupedChats.findIndex(
          (c) => c.latestMessage.groupInfo.id === chat.groupInfo.id
        );
        if (index === -1) {
          groupedChats.push(user);
        } else {
          groupedChats[index] = user;
        }
      } catch (e) {
        // console.log(e);
      }
    }
    return groupedChats.sort(
      (a, b) =>
        b.latestMessage.createdAt.getTime() -
        a.latestMessage.createdAt.getTime()
    );
  }

  static isToday(dateTime: Date) {
    var now = new Date();
    if (
      dateTime.getFullYear() === now.getFullYear() &&
      dateTime.getMonth() === now.getMonth() &&
      dateTime.getDate() === now.getDate()
    ) {
      return true;
    }
    return false;
  }

  static getRole(role: string): Role {
    switch (role) {
      case "Admin":
        return Role.Admin;
      case "Teacher Assistant":
        return Role.Assistant;
      case "PO Manager":
        return Role.PoManager;
      default:
        return Role.Teacher;
    }
  }
}
