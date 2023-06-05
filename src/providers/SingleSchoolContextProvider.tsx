import React, { FC, createContext, useEffect, useState } from "react";
import { School } from "../interfaces/school";
import { doc, onSnapshot } from "firebase/firestore";
import { firestore } from "../lib/config";

interface ContextValue {
  isLoading: boolean;
  error: string | null;
  school: School | null;
}

const SingleSchoolContext = createContext<ContextValue>({
  isLoading: true,
  error: null,
  school: null,
});

interface Props {
  id: string;
  children: (value: ContextValue) => React.ReactNode;
}

const SingleSchoolContextProvider: FC<Props> = ({ children, id }) => {
  const [school, setSchool] = useState<ContextValue>({
    isLoading: true,
    error: null,
    school: null,
  });

  useEffect(() => {
    if (!id) {
      setSchool((prev) => ({
        ...prev,
        isLoading: false,
        error: "Invalid school ID.",
      }));
      return;
    }
    const unsub = onSnapshot(doc(firestore, "schools", id), (doc) => {
      if (doc.exists()) {
        setSchool({ isLoading: false, error: null, school: doc.data() as any });
      } else {
        setSchool((prev) => ({
          isLoading: false,
          error: "School not found!",
          school: prev.school,
        }));
      }
    });
    return () => {
      unsub();
    };
  }, [id]);
  return (
    <SingleSchoolContext.Provider value={school}>
      {children(school)}
    </SingleSchoolContext.Provider>
  );
};

export default SingleSchoolContextProvider;
