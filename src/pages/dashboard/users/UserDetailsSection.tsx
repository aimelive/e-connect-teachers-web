import { ChangeEvent, FC, useEffect, useState } from "react";
import { Account } from "../../../interfaces/account";
import { useToast } from "../../../providers/GlobalContext";
import Utils, { Role } from "../../../lib/utils";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { firestore } from "../../../lib/config";
import { useNavigate } from "react-router-dom";
import { Keys } from "../../../lib/keys";
import { Button, Modal } from "antd";
import { useCurrentUser } from "../../../lib/hooks/auth";

const UserDetailsSection: FC<{ account: Account }> = ({ account }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [accountData, setAccountData] = useState<Account>(account);
  const show = useToast();
  const { account: currentUser, role } = useCurrentUser();

  const handleSaveChanges = async () => {
    const newObj = Utils.compareObj(account, accountData);
    if (!Object.keys(newObj).length) {
      show({ type: "error", message: "No changes made" });
      return;
    }
    setLoading(true);
    await updateDoc(doc(firestore, "users", account.id), newObj);
    show({ type: "success", message: "User account updated successfully!" });
    setIsEditing(false);
    setLoading(false);
  };

  useEffect(() => {
    setAccountData(account);
  }, [account]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    if (e.target.name.startsWith("role.")) {
      setAccountData((prev) => ({
        ...prev,
        role: {
          ...prev.role,
          name: e.target.value,
        },
      }));
      return;
    }
    setAccountData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  //Deleting actions
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const nav = useNavigate();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    setIsLoading(true);
    try {
      await deleteDoc(doc(firestore, "users", account.id));
      show({
        type: "success",
        message: "User account has deleted successfully!",
      });
      setIsModalOpen(false);
      nav("/dashboard/users");
    } catch (error: any) {
      show({
        type: "success",
        message: error.message || Keys.DEFAULT_ERROR_MESSAGE,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <div className="flex items-center gap-6 pb-10 border-b">
        <button
          onClick={() => history.back()}
          className="flex items-center gap-2 bg-slate-100 rounded-full p-3 text-sm"
        >
          <img src="/icons/arrow-right.svg" alt="" className="w-4 h-4" />
        </button>
        <h1 className="font-bold text-xl">{account.names}</h1>
      </div>
      <div className="grid md:grid-cols-2 gap-x-10 pb-6 border-b mt-3">
        <div className="">
          <div className="my-3">
            <h1 className="font-[500]">Names</h1>
            {!isEditing ? (
              <p className=""> {account.names}</p>
            ) : (
              <input
                defaultValue={accountData.names}
                className="px-4 py-2 border-b border-slate-200 outline-none bg-gray-50 w-full"
                disabled={loading}
                name="names"
                onChange={handleChange}
              />
            )}
          </div>
          <div className="my-3">
            <h1 className="font-[500]">Profile Pic</h1>
            {!isEditing ? (
              <img
                src={account.profile_pic}
                alt={account.names}
                width={50}
                height={50}
                className="object-cover w-16 h-16 rounded-full m-1"
              />
            ) : (
              <input
                defaultValue={accountData.profile_pic}
                className="px-4 py-2 border-b border-slate-200 outline-none bg-gray-50 w-full"
                disabled={loading}
                name="profile_pic"
                onChange={handleChange}
              />
            )}
          </div>
        </div>
        <div>
          <div>
            <h1 className="font-[500]">Phone number</h1>
            {!isEditing ? (
              <p className=""> {account.tel}</p>
            ) : (
              <input
                defaultValue={accountData.tel}
                className="px-4 py-2 border-b border-slate-200 outline-none bg-gray-50 w-full"
                disabled={loading}
                name="tel"
                onChange={handleChange}
              />
            )}
          </div>
          {
            <div className="my-3">
              <h1 className="font-[500]">Role</h1>
              {!isEditing ? (
                <p className=""> {account.role.name}</p>
              ) : (
                role === Role.Admin &&
                account.role.name != "Admin" && (
                  <select
                    name="role.name"
                    disabled={loading}
                    value={accountData.role.name}
                    onChange={handleChange}
                    id="role"
                    className="rounded-md bg-gray-50  outline-none   px-4 py-2   w-full text-sm shadow-sm"
                  >
                    <option value="Teacher">TEACHER</option>
                    <option value="Teacher Assistant">TEACHER ASSISTANT</option>
                    <option value="PO Manager">PO-MANAGER</option>
                  </select>
                )
              )}
            </div>
          }
        </div>

        {(role === Role.Admin || account.id === currentUser?.id) && (
          <div className="flex items-center gap-4 mt-3">
            {!isEditing ? (
              <button
                className="px-4 rounded-full w-fit flex items-center gap-2 py-3 bg-gray-100 "
                disabled={loading}
                onClick={() => setIsEditing(true)}
              >
                <img src="/icons/edit.svg" alt="" className="w-4 h-4" />
                Edit
              </button>
            ) : (
              <>
                <button
                  className="px-4 rounded-full w-fit flex items-center gap-2 py-3 bg-brand text-white "
                  disabled={loading}
                  onClick={handleSaveChanges}
                >
                  {loading ? "Please wait..." : "Save"}
                </button>
                <button
                  className="px-4 rounded-full w-fit flex items-center gap-2 py-3 bg-gray-100 text-black "
                  disabled={loading}
                  onClick={() => {
                    setIsEditing(false);
                    setAccountData(account);
                  }}
                >
                  Cancel
                </button>
              </>
            )}
          </div>
        )}
      </div>
      {account.id !== currentUser?.id && role === Role.Admin && (
        <>
          <hr />
          <h1 className=" font-bold text-lg my-6">Danger zone</h1>
          <div className="flex items-start space-y-2 sm:space-y-0 sm:items-center flex-col sm:flex-row justify-between bg-red-50 rounded-md p-4">
            <div>
              <h1 className=" font-bold">Delete user</h1>
              <p className="">This action can't be undone </p>
            </div>
            <button
              className="px-6 py-3 rounded-md bg-red-500 text-white hover:bg-red-600"
              onClick={showModal}
            >
              Delete
            </button>
            <Modal
              title="Confirm Delete."
              open={isModalOpen}
              onOk={handleOk}
              onCancel={handleCancel}
              footer={[
                <Button key="back" onClick={handleCancel} danger>
                  Cancel
                </Button>,
                <Button
                  key="submit"
                  type="primary"
                  loading={isLoading}
                  onClick={handleOk}
                  className="bg-red-500"
                  danger
                >
                  Delete
                </Button>,
              ]}
            >
              <p>This action can not be undone and will have an effect.</p>
              <p>
                Are you sure do you want to delete{" "}
                <span className="font-semibold">{account.names}</span> ?
              </p>
            </Modal>
          </div>
        </>
      )}
    </>
  );
};

export default UserDetailsSection;
