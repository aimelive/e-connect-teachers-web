import React, { FC, createContext, useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { firestore } from "../lib/config";
import { Account } from "../interfaces/account";

interface ContextValue {
  isLoading: boolean;
  error: string | null;
  account: Account | null;
}

const SingleUserContext = createContext<ContextValue>({
  isLoading: true,
  error: null,
  account: null,
});

interface Props {
  id: string;
  children: (value: ContextValue) => React.ReactNode;
}

const SingleUserContextProvider: FC<Props> = ({ children, id }) => {
  const [account, setAccount] = useState<ContextValue>({
    isLoading: true,
    error: null,
    account: null,
  });

  useEffect(() => {
    if (!id) {
      setAccount((prev) => ({
        ...prev,
        isLoading: false,
        error: "Invalid account ID.",
      }));
      return;
    }
    const unsub = onSnapshot(doc(firestore, "users", id), (doc) => {
      if (doc.exists()) {
        setAccount({
          isLoading: false,
          error: null,
          account: doc.data() as any,
        });
      } else {
        setAccount((prev) => ({
          isLoading: false,
          error: "Account not found!",
          account: prev.account,
        }));
      }
    });
    return () => {
      unsub();
    };
  }, [id]);
  return (
    <SingleUserContext.Provider value={account}>
      {children(account)}
    </SingleUserContext.Provider>
  );
};

export default SingleUserContextProvider;
