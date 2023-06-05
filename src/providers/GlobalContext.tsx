import { createContext, useContext, useState, useEffect } from "react";
import useAuth, { AppAuth } from "../lib/hooks/auth";

export type Notification = {
  message: string;
  type: "error" | "success" | "warning";
};

interface ContextValue {
  isLoggedIn: boolean;
  setIsLoggedIn: (value: boolean) => void;
  auth: AppAuth | null;
  notification: Notification | null;
  setNotificationHandler: (value: Notification | null) => void;
}

const GlobalContext = createContext<ContextValue>({
  isLoggedIn: false,
  auth: null,
  setIsLoggedIn: (_value: boolean) => {},
  notification: null,
  setNotificationHandler: (_value: Notification | null) => {},
});

export const GlobalContextProvider = ({
  children,
}: {
  children: (value: ContextValue) => React.ReactNode;
}) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [notification, setNotification] = useState<Notification | null>(null);
  // const nav = useNavigate();

  const setNotificationHandler = (value: Notification | null) => {
    setNotification(value);
    setTimeout(() => {
      setNotification(null);
    }, 4000);
  };

  const auth = useAuth();
  // const location = useLocation();

  useEffect(() => {
    if (auth.account && !auth.error && auth.user && !auth.loading) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [auth]);

  useEffect(() => {
    if (auth.error) {
      setNotificationHandler({ message: auth.error, type: "error" });
    }
  }, [auth.error]);

  const value: ContextValue = {
    isLoggedIn,
    setIsLoggedIn,
    notification,
    auth,
    setNotificationHandler,
  };

  return (
    <GlobalContext.Provider value={value}>
      {children(value)}
    </GlobalContext.Provider>
  );
};

export default function useGlobalCtx() {
  return useContext(GlobalContext);
}
export const useToast = () => {
  const { setNotificationHandler: show } = useGlobalCtx();
  return show;
};
