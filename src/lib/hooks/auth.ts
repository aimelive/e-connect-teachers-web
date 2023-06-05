import { useEffect, useState } from "react";
import { User, signOut } from "firebase/auth";
import { auth as authInstance, firestore } from "../config";
import app from "../config";
import { doc, getDoc } from "firebase/firestore";
import { Account } from "../../interfaces/account";
import { Keys } from "../keys";
import useGlobalCtx from "../../providers/GlobalContext";

export interface AppAuth {
  user: User | null;
  account: Account | null;
  loading: boolean;
  error: string | null;
}

const initAuth: AppAuth = {
  user: null,
  account: null,
  loading: true,
  error: null,
};

const useAuth = () => {
  const [auth, setAuth] = useState<AppAuth>(initAuth);
  useEffect(() => {
    const unsubscribe = authInstance.onAuthStateChanged(async (user) => {
      let error: string | null = null;
      let account: Account | null = auth.account;

      if (user != null) {
        try {
          const docRef = doc(firestore, "users", user.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            account = docSnap.data() as any;
            if (!account?.email || !account.names || !account.role) {
              error =
                "Invalid user account informations, try again later or contact admin.";
            }
          } else {
            error =
              "Account informations are not available! Contact an admin for help or try again later.";
            await signOut(authInstance);
          }
        } catch (e: any) {
          error = `${Keys.DEFAULT_ERROR_MESSAGE} : ${e.message || ""}`;
        }
      }

      setAuth({ loading: false, user, account, error });
    });

    return () => {
      unsubscribe();
    };
  }, [app]);

  return auth;
};

export const useCurrentUser = () => {
  const { auth } = useGlobalCtx();
  return { account: auth?.account, user: auth?.user };
};

export default useAuth;
