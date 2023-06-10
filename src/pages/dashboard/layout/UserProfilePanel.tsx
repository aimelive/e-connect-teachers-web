import { signOut } from "firebase/auth";
import { auth } from "../../../lib/config";
import { FC } from "react";
import { Link } from "react-router-dom";
import { useCurrentUser } from "../../../lib/hooks/auth";

export const UserProfilePanel: FC = ({}) => {
  const { account } = useCurrentUser();

  return (
    <div className="sm:w-full max-h-[20vh] overflow-y-scroll scrollDiv">
      <div className="flex flex-col space-y-2">
        <Link
          to={`/dashboard/users/${account?.id}`}
          className="p-2 hover:bg-slate-50"
        >
          My Account
        </Link>
        <hr />
        <button
          className="bg-brand text-white px-4 py-1 rounded"
          onClick={async () => {
            await signOut(auth);
          }}
        >
          Signout
        </button>
      </div>
    </div>
  );
};
