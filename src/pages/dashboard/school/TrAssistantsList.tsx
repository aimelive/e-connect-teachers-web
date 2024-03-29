import { Table } from "antd";
import Column from "antd/es/table/Column";
import { FC, useState } from "react";
import { UsersListProvider } from "../../../providers/UsersListProvider";
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import { firestore } from "../../../lib/config";
import { useToast } from "../../../providers/GlobalContext";
import IsAddingTeacherModal from "../../../components/shared/IsAddingTeacherModal";
import { useCurrentUser } from "../../../lib/hooks/auth";
import { Role } from "../../../lib/utils";

const columns = [
  {
    title: "Photo",
    dataIndex: "profile_pic",
    key: "profile_pic",
    render: (image: string) => (
      <img
        src={image}
        alt="#"
        width={40}
        height={40}
        className="w-10 h-10 rounded-full "
      />
    ),
  },
  {
    title: "Names",
    dataIndex: "names",
    key: "names",
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
  },
];

export const TeachersAssistantList: FC<{
  teachers: string[];
  schoolId: string;
}> = ({ schoolId, teachers }) => {
  const [isAddingTeacher, setIsAddingTeacher] = useState(false);
  const show = useToast();
  const { role } = useCurrentUser();
  const isManager = role === Role.Admin || role === Role.PoManager;

  // Hahndle add teacher
  const handleAddTeacher = async (id: string) => {
    setIsAddingTeacher(false);
    try {
      await updateDoc(doc(firestore, "schools", schoolId), {
        teachers: arrayUnion(id),
      });
      show({
        type: "success",
        message: "Teacher added to a school successfully.",
      });
    } catch (error: any) {
      show({
        type: "error",
        message:
          "Something went wrong while adding the teacher, please try again.",
      });
    }
  };
  // Hahndle remove teacher
  const handleRemoveTeacher = async (id: string) => {
    try {
      await updateDoc(doc(firestore, "schools", schoolId), {
        teachers: arrayRemove(id),
      });
      show({
        type: "success",
        message: "Teacher removed from a school successfully.",
      });
      window.location.reload();
    } catch (error: any) {
      show({
        type: "error",
        message:
          "Something went wrong while removing the teacher, please try again.",
      });
    }
  };

  return (
    <div className="mt-6  py-6 bg-white rounded-md">
      <UsersListProvider
        where={{
          field: "id",
          filter: "in",
          equal: !teachers.length ? ["none-none"] : teachers,
        }}
      >
        {(value) => {
          if (value.loading) {
            return <div>Loading, please wait....</div>;
          }
          if (value.error) {
            return <div>{value.error}</div>;
          }
          return (
            <>
              <div className="flex items-center justify-between">
                <h1 className="font-bold text-lg my-2">Teachers' Assistants</h1>
                {isManager && (
                  <button
                    className="px-4 rounded-full  py-3  bg-brand text-white"
                    onClick={() => setIsAddingTeacher(true)}
                  >
                    +&nbsp;&nbsp;Add
                  </button>
                )}
                <IsAddingTeacherModal
                  select="Teacher Assistant"
                  open={isAddingTeacher}
                  onClose={() => setIsAddingTeacher(false)}
                  onAdd={(id) => handleAddTeacher(id)}
                  exclude={teachers}
                />
              </div>
              <Table
                dataSource={value.users.filter(
                  (user) => user.role.name === "Teacher Assistant"
                )}
                pagination={{
                  position: ["bottomRight"],
                  size: "small",
                  pageSize: 6,
                }}
                className="w-full overflow-x-auto"
              >
                {columns.map((column) => (
                  <Column {...column} />
                ))}
                {isManager && (
                  <Column
                    title="Action"
                    key="action"
                    render={(_: any, record: (typeof value.users)[0]) => (
                      <button
                        className="px-4 rounded-md text-red-600 border border-red-200 py-1 bg-red-100"
                        onClick={() => handleRemoveTeacher(record.id)}
                      >
                        {"Remove "}
                      </button>
                    )}
                  />
                )}
              </Table>
            </>
          );
        }}
      </UsersListProvider>
    </div>
  );
};
