import { useParams } from "react-router-dom";
import UserDetailsSection from "./UserDetailsSection";
import SingleUserContextProvider from "../../../providers/SingleUserContextProvider";
import { Keys } from "../../../lib/keys";

export default function SingleUser() {
  const { id } = useParams();

  return (
    <div className="p-10 rounded-md bg-white">
      <SingleUserContextProvider id={id || ""}>
        {(value) => {
          if (value.isLoading) {
            return <div>Loading, please wait....</div>;
          }
          if (value.error || !value.account) {
            return <div>{value.error || Keys.DEFAULT_ERROR_MESSAGE}</div>;
          }
          return <UserDetailsSection account={value.account} />;
        }}
      </SingleUserContextProvider>
    </div>
  );
}
