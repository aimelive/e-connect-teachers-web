import { collection, onSnapshot, query, where } from "firebase/firestore";
import React, { createContext, useEffect, useState } from "react";
import { firestore } from "../lib/config";
import { useCurrentUser } from "../lib/hooks/auth";
import { ChatMessage } from "../interfaces/chat";

interface ContextValue {
  isLoading: boolean;
  error: string | null;
  chats: ChatMessage[];
}

const initChatsValue = {
  chats: [],
  isLoading: true,
  error: null,
};

const ChatsContext = createContext<ContextValue>(initChatsValue);

export const ChatsContextProvider = ({
  children,
}: {
  children: (value: ContextValue) => React.ReactNode;
}) => {
  const [chats, setChats] = useState<ContextValue>(initChatsValue);

  const { account } = useCurrentUser();

  useEffect(() => {
    const q = query(
      collection(firestore, "chatMessages"),
      where("receivers", "array-contains", account?.id)
    );
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const chatsData: ChatMessage[] = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data() as any;
        chatsData.push({
          ...data,
          createdAt: data.createdAt?.toDate() || new Date(),
        });
      });
      setChats({
        chats: chatsData.sort(
          (a, b) => a.createdAt.getTime() - b.createdAt.getTime()
        ),
        isLoading: false,
        error: null,
      });
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <ChatsContext.Provider value={chats}>
      {children(chats)}
    </ChatsContext.Provider>
  );
};
