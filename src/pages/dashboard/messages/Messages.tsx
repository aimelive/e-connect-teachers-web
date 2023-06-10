import UsersChatsSection from "./UsersChatsSection";
import ChatRoomSection from "./ChatRoomSection";
import { ChatsContextProvider } from "../../../providers/ChatsContextProvider";
import Utils from "../../../lib/utils";
import { useCurrentUser } from "../../../lib/hooks/auth";
import { useState } from "react";
import { UserChatMessage } from "../../../interfaces/chat";

export default function MessagesPage() {
  const { account } = useCurrentUser();
  const [currentChatUser, setCurrentChatUser] =
    useState<UserChatMessage | null>(null);

  return (
    <>
      {" "}
      <div className="md:hidden">
        Use our mobile app for chats on mobile devices.
      </div>
      <div className="bg-white rounded-md p-10 md:grid md:grid-cols-2 w-full h-full hidden">
        <ChatsContextProvider>
          {(value) => {
            if (value.isLoading) {
              return <div>Loading chats, please wait...</div>;
            }
            if (value.error) {
              return (
                <div>
                  Ooops, something went wrong while trying to retrieve chats,
                  please refresh the page and try again.
                </div>
              );
            }
            const chatUsers = Utils.groupChatsByUser(
              account?.id || "none-none",
              value.chats
            );

            return (
              <>
                <UsersChatsSection
                  chatUsers={chatUsers}
                  currentChatUser={currentChatUser}
                  onSelectUserChat={(userChat) => setCurrentChatUser(userChat)}
                />
                <ChatRoomSection
                  currentChatUser={currentChatUser}
                  onClose={() => setCurrentChatUser(null)}
                  chatMessages={value.chats.filter(
                    (message) =>
                      message.groupInfo.id ===
                      currentChatUser?.latestMessage?.groupInfo?.id
                  )}
                />
              </>
            );
          }}
        </ChatsContextProvider>
      </div>
    </>
  );
}
