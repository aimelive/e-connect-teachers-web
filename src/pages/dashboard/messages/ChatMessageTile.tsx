import { FC } from "react";
import { ChatMessage } from "../../../interfaces/chat";

interface ChatMessageTileProps {
  message: ChatMessage;
  isMe: boolean;
}

export const ChatMessageTile: FC<ChatMessageTileProps> = ({
  message,
  isMe,
}) => {
  return (
    <div
      className={`flex w-full my-2 ${
        isMe ? "justify-end" : "justify-start"
      } items-start space-x-2`}
    >
      {message.isGroup && !isMe && (
        <img
          src={message.senderInfo.avatar}
          alt={message.senderInfo.name}
          className="w-10 h-10 rounded-full object-cover"
        />
      )}
      <div className="w-fit max-w-[75%] flex flex-col space-y-1">
        {message.isGroup && !isMe && (
          <p className="text-brand text-xs italic">{message.senderInfo.name}</p>
        )}
        <div
          className={`${
            isMe ? "bg-brand rounded-tr-none" : "bg-primary rounded-tl-none"
          } py-3 px-4 rounded-2xl text-white`}
        >
          {message.image && (
            <img
              src={message.image}
              alt="#"
              onDoubleClick={() => {
                window.open(message.image!, "_blank");
              }}
            />
          )}
          {message.message}
        </div>
      </div>
    </div>
  );
};
