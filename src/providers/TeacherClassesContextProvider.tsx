import {
  QueryFieldFilterConstraint,
  collection,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import React, { createContext, useEffect, useState } from "react";
import { firestore } from "../lib/config";
import { useCurrentUser } from "../lib/hooks/auth";
import { TrClass } from "../interfaces/trClass";
import { useSchools } from "./SchoolsProvider";
import { Role } from "../lib/utils";

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

  const { account, role } = useCurrentUser();
  const { schools } = useSchools();

  useEffect(() => {
    let customWhere: QueryFieldFilterConstraint = where(
      "teacherId",
      "==",
      account?.id
    );
    if (role == Role.Assistant) {
      customWhere = where("trAssistantId", "==", account?.id);
    }
    if (role === Role.PoManager) {
      customWhere = where(
        "schoolId",
        "array-contains",
        schools.length ? schools.map((val) => val.id) : ["none-none"]
      );
    }
    if (role === Role.Admin) {
      customWhere = where("id", "!=", "");
    }
    const q = query(collection(firestore, "classes"), customWhere);
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const trClassesData: TrClass[] = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data() as any;
        trClassesData.push({
          ...data,
          date: data.date.toDate(),
          createdAt: new Date(data.createdAt.seconds * 1000),
          updatedAt: new Date(data.updatedAt.seconds * 1000),
        });
      });
      setTrClasses({
        trClasses: trClassesData.sort(
          (a, b) => b.date.getTime() - a.date.getTime()
        ),
        isLoading: false,
        error: null,
      });
    });

    return () => {
      unsubscribe();
    };
  }, [schools.length]);

  return (
    <TeacherClassesContext.Provider value={trClasses}>
      {children(trClasses)}
    </TeacherClassesContext.Provider>
  );
};
