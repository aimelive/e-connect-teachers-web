import { collection, onSnapshot, query, where } from "firebase/firestore";
import React, { createContext, useEffect, useState } from "react";
import { firestore } from "../lib/config";
import { Feedback } from "../interfaces/feedback";

interface ContextValue {
  isLoading: boolean;
  error: string | null;
  feedbacks: Feedback[];
}

const FeedbacksContext = createContext<ContextValue>({
  feedbacks: [],
  isLoading: true,
  error: null,
});

export const FeedbacksProvider = ({
  children,
  classId,
}: {
  children: (value: ContextValue) => React.ReactNode;
  classId: string;
}) => {
  const [feedbacks, setFeedbacks] = useState<ContextValue>({
    feedbacks: [],
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    if (!classId) {
      setFeedbacks((prev) => ({ ...prev, error: "ID required!" }));
      return;
    }
    const q = query(
      collection(firestore, "feedbacks"),
      where("classId", "==", classId)
    );
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const feedbacksData: Feedback[] = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data() as any;
        feedbacksData.push(data);
      });
      setFeedbacks({
        feedbacks: feedbacksData,
        isLoading: false,
        error: null,
      });
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <FeedbacksContext.Provider value={feedbacks}>
      {children(feedbacks)}
    </FeedbacksContext.Provider>
  );
};
