import { Empty, Modal } from "antd";
import { ChangeEvent, useState } from "react";
import { collection, query, where } from "firebase/firestore";
import { UsersListProvider } from "../../../providers/UsersListProvider";
import { firestore } from "../../../lib/config";
import { Account } from "../../../interfaces/account";

const SelectUserChatModal = ({
  open,
  onClose,
  onSelected,
  exclude,
}: {
  open: boolean;
  onClose: () => void;
  onSelected: (user: Account) => void;
  exclude: string[];
}) => {
  const [searchQuery, setSearchQuery] = useState<string>("");

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };
  return (
    <Modal open={open} onOk={onClose} onCancel={onClose} footer={null}>
      <h1 className="font-bold text-lg">Select a member</h1>
      <div className="teachers bg-gray-50 px-2 mt-2">
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearch}
          className="rounded-md bg-gray-50  outline-none   px-4 py-2   w-full text-sm shadow-sm"
          placeholder="Search member"
        />
        <UsersListProvider
          customQuery={query(
            collection(firestore, "users"),
            where("names", ">=", searchQuery),
            where("names", "<=", searchQuery + "\uf8ff")
          )}
        >
          {(value) => {
            if (value.loading) {
              return <div>Loading, please wait....</div>;
            }
            if (value.error) {
              return <div>{value.error}</div>;
            }
            const users = value.users.filter((tr) => !exclude.includes(tr.id));

            if (!users.length) {
              return <Empty description="Members not found" />;
            }
            return users.map((data, index) => (
              <div
                key={index}
                className="py-2 hover:bg-brand/20 px-4 cursor-pointer rounded-md flex items-center space-x-2 my-1"
                onClick={() => onSelected(data)}
              >
                <img
                  src={data.profile_pic}
                  alt="#"
                  width={40}
                  height={40}
                  className="w-10 h-10 rounded-full "
                />
                <div>
                  <h1 className=" font-bold">{data.names}</h1>
                  <p className="">{data.role.name} </p>
                </div>
              </div>
            ));
          }}
        </UsersListProvider>
      </div>
    </Modal>
  );
};

export default SelectUserChatModal;
