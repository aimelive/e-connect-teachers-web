import { collection, onSnapshot, query } from "firebase/firestore";
import React, { createContext, useEffect, useState } from "react";
import { firestore } from "../lib/config";
import { useCurrentUser } from "../lib/hooks/auth";
import { TrClass } from "../interfaces/trClass";

interface ContextValue {
  isLoading: boolean;
  error: string | null;
  trClasses: TrClass[];
}

const TeacherClassesContext = createContext<ContextValue>({
  trClasses: [],
  isLoading: true,
  error: null,
});

export const TeacherClassesProvider = ({
  children,
}: {
  children: (value: ContextValue) => React.ReactNode;
}) => {
  const [trClasses, setTrClasses] = useState<ContextValue>({
    trClasses: [],
    isLoading: true,
    error: null,
  });

  const { account } = useCurrentUser();

  useEffect(() => {
    const q = query(collection(firestore, "classes"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const trClassesData: TrClass[] = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data() as any;
        trClassesData.push({
          ...data,
          createdAt: new Date(data.createdAt.seconds * 1000),
          updatedAt: new Date(data.updatedAt.seconds * 1000),
        });
      });
      setTrClasses({ trClasses: trClassesData, isLoading: false, error: null });
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <TeacherClassesContext.Provider value={trClasses}>
      {children(trClasses)}
    </TeacherClassesContext.Provider>
  );
};
