import {
  DocumentData,
  Query,
  Unsubscribe,
  WhereFilterOp,
  collection,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import React, { createContext, useContext, useEffect, useState } from "react";
import { firestore } from "../lib/config";
import { Account } from "../interfaces/account";
import { Keys } from "../lib/keys";

interface ContextValue {
  users: Account[];
  loading: boolean;
  error: string | null;
}

const UsersContext = createContext<ContextValue>({
  users: [],
  loading: true,
  error: null,
});

export const UsersListProvider = ({
  where: customWhere,
  customQuery,
  children,
}: {
  where?: { field: string; filter: WhereFilterOp; equal: any };
  customQuery?: Query<DocumentData>;
  children: (value: ContextValue) => React.ReactNode;
}) => {
  const [value, setValue] = useState<ContextValue>({
    users: [],
    loading: true,
    error: null,
  });

  useEffect(() => {
    let unsubscribe: Unsubscribe;
    try {
      let q: Query<DocumentData> | undefined = customQuery;
      if (customWhere) {
        q = query(
          collection(firestore, "users"),
          where(customWhere.field, customWhere.filter, customWhere.equal)
        );
      }
      if (!q) {
        throw new Error("Query required to retrieve data.");
      }

      unsubscribe = onSnapshot(q, (querySnapshot) => {
        const userData: Account[] = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data() as any;
          userData.push({
            ...data,
          });
        });
        setValue((prev) => ({ ...prev, users: userData, error: null }));
      });
    } catch (error: any) {
      setValue((prev) => ({
        ...prev,
        error: error.message || Keys.DEFAULT_ERROR_MESSAGE,
      }));
    } finally {
      setValue((prev) => ({ ...prev, loading: false }));
    }
    return () => {
      if (typeof unsubscribe == "function") unsubscribe();
    };
  }, [customQuery, where]);

  return (
    <UsersContext.Provider value={value}>
      {children(value)}
    </UsersContext.Provider>
  );
};

export const useNotifications = () => {
  return useContext(UsersContext);
};
