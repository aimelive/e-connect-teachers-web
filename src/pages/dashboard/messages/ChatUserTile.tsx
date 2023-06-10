import { FC } from "react";
import { UserChatMessage } from "../../../interfaces/chat";
import { Avatar } from "antd";
import { useCurrentUser } from "../../../lib/hooks/auth";

interface Props {
  userChat: UserChatMessage;
  isActive: boolean;
  onClick: () => void;
}

const ChatUserTile: FC<Props> = ({ userChat, onClick, isActive }) => {
  const { account } = useCurrentUser();
  const iAmReceiver: boolean =
    userChat.latestMessage.senderId != account?.id &&
    !userChat.latestMessage.isGroup;
  return (
    <div
      className={`p-3 border-b border-slate-50 hover:bg-slate-100 cursor-pointer flex items-center gap-4 ${
        isActive && "bg-slate-200"
      }`}
      onClick={onClick}
    >
      <Avatar
        size={45}
        src={
          iAmReceiver
            ? userChat.latestMessage.senderInfo.avatar
            : userChat.latestMessage.groupInfo.avatar
        }
      />
      <div className="flex-grow">
        <h6 className="font-[500]">
          {iAmReceiver
            ? userChat.latestMessage.senderInfo.name
            : userChat.latestMessage.groupInfo.name}
        </h6>
        <p className="text-slate-700">
          {account?.id === userChat.latestMessage.senderId && "⌁"}{" "}
          {userChat.latestMessage.message}
        </p>
      </div>
      {userChat.unread !== 0 && (
        <div className="bg-red-600 w-4 h-4 text-white text-xs rounded-full flex items-center justify-center text-center">
          {userChat.unread}
        </div>
      )}
    </div>
  );
};

export default ChatUserTile;
