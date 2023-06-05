import { signOut } from "firebase/auth";
import { auth } from "../../../lib/config";
import { FC } from "react";

export const UserProfilePanel: FC = ({}) => {
  return (
    <div className="sm:w-full max-h-[20vh] overflow-y-scroll scrollDiv">
      <button
        className="bg-brand text-white px-4 py-1 rounded"
        onClick={async () => {
          await signOut(auth);
        }}
      >
        Logout
      </button>
    </div>
  );
};
