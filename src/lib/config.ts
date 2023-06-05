import { initializeApp } from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
import { Keys } from "./keys";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: Keys.API_KEY,
  authDomain: Keys.AUTH_DOMAIN,
  projectId: Keys.PROJECT_ID,
  storageBucket: Keys.STORAGE_BUCKET,
  messagingSenderId: Keys.MESSAGING_SENDER_ID,
  appId: Keys.APP_ID,
  measurementId: Keys.MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app);
export const analytics = getAnalytics(app);
export const auth = getAuth(app);

export default app;
