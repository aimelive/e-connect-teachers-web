import { collection, onSnapshot, query, where } from "firebase/firestore";
import React, { createContext, useContext, useEffect, useState } from "react";
import { firestore } from "../lib/config";
import { useCurrentUser } from "../lib/hooks/auth";
import { School } from "../interfaces/school";

interface ContextValue {
  schools: School[];
}

const SchoolsContext = createContext<ContextValue>({ schools: [] });

export const SchoolsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [schools, setSchools] = useState<School[]>([]);
  const { account } = useCurrentUser();

  useEffect(() => {
    const q = query(collection(firestore, "schools"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const schoolsData: School[] = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data() as any;
        schoolsData.push({
          ...data,
          createdAt: new Date(data.createdAt.seconds * 1000),
          updatedAt: new Date(data.updatedAt.seconds * 1000),
        });
      });
      setSchools(schoolsData);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <SchoolsContext.Provider value={{ schools }}>
      {children}
    </SchoolsContext.Provider>
  );
};

export const useSchools = () => {
  return useContext(SchoolsContext);
};