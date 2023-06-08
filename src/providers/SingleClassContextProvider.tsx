import React, { FC, createContext, useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { firestore } from "../lib/config";
import { TrClass } from "../interfaces/trClass";

interface ContextValue {
  isLoading: boolean;
  error: string | null;
  trClass: TrClass | null;
}

const SingleClassContext = createContext<ContextValue>({
  isLoading: true,
  error: null,
  trClass: null,
});

interface Props {
  id: string;
  children: (value: ContextValue) => React.ReactNode;
}

const SingleClassContextProvider: FC<Props> = ({ children, id }) => {
  const [trClass, setTrClass] = useState<ContextValue>({
    isLoading: true,
    error: null,
    trClass: null,
  });

  useEffect(() => {
    if (!id) {
      setTrClass((prev) => ({
        ...prev,
        isLoading: false,
        error: "Invalid teacher class ID.",
      }));
      return;
    }
    const unsub = onSnapshot(doc(firestore, "classes", id), (doc) => {
      if (doc.exists()) {
        const trClass = doc.data() as any;
        setTrClass({
          isLoading: false,
          error: null,
          trClass: { ...trClass, date: trClass.date.toDate() },
        });
      } else {
        setTrClass((prev) => ({
          isLoading: false,
          error: "Class not found!",
          trClass: prev.trClass,
        }));
      }
    });
    return () => {
      unsub();
    };
  }, [id]);
  return (
    <SingleClassContext.Provider value={trClass}>
      {children(trClass)}
    </SingleClassContext.Provider>
  );
};

export default SingleClassContextProvider;
