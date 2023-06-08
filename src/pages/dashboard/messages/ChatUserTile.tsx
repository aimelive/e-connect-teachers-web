import { FC } from "react";
import { UserChatMessage } from "../../../interfaces/chat";
import { Avatar } from "antd";

interface Props {
  userChat: UserChatMessage;
  isActive: boolean;
  onClick: () => void;
}

const ChatUserTile: FC<Props> = ({ userChat, onClick, isActive }) => {
  return (
    <div
      className={`p-3 border-b border-slate-50 hover:bg-slate-100 cursor-pointer flex items-center gap-4 ${
        isActive && "bg-slate-200"
      }`}
      onClick={onClick}
    >
      <Avatar size={45} src={userChat.latestMessage.groupInfo.avatar} />
      <div>
        <h6 className="font-[500]">{userChat.latestMessage.groupInfo.name}</h6>
        <p className="text-slate-700">{userChat.latestMessage.message}</p>
      </div>
    </div>
  );
};

export default ChatUserTile;
