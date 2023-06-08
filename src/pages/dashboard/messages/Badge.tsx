import { useCurrentUser } from "../../../lib/hooks/auth";
import { ChatsContextProvider } from "../../../providers/ChatsContextProvider";

const Badge = () => {
  const { account } = useCurrentUser();
  return (
    <ChatsContextProvider>
      {(value) => {
        const unread = value.chats.filter(
          (ch) => !ch.views.includes(account!.id)
        ).length;
        if (unread) {
          return (
            <div className="bg-red-600 w-5 h-5 flex items-center justify-center text-white rounded-full text-xs">
              {unread}
            </div>
          );
        }
        return null;
      }}
    </ChatsContextProvider>
  );
};

export default Badge;
