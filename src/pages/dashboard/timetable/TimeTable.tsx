import { Table } from "antd";
import { TeacherClassesProvider } from "../../../providers/TeacherClassesContextProvider";
import { Keys } from "../../../lib/keys";
import Column from "antd/es/table/Column";
import { TrClass } from "../../../interfaces/trClass";
import SingleUserContextProvider from "../../../providers/SingleUserContextProvider";
import { Link, useSearchParams } from "react-router-dom";
import SingleClassTileActions from "./SingleClassTileActions";
import AddClassFormSidebar, { SidebarProps } from "./AddClassFormSidebar";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { firestore } from "../../../lib/config";
import { useToast } from "../../../providers/GlobalContext";

const timeTableColumns: {
  title: string;
  dataIndex: string;
  key: string;
  render?: any;
}[] = [
  {
    title: "Course Title",
    dataIndex: "course",
    key: "course",
    render: (course: any) => (
      <Link to={`/dashboard/time-table/${course.id}`}>{course.name}</Link>
    ),
  },
  {
    title: "Date",
    dataIndex: "date",
    key: "date",
    render: (value: any) => {
      return (
        <span className="b whitespace-nowrap">
          {value.toLocaleDateString("en-GB", {
            day: "numeric",
            month: "short",
            year: "numeric",
          })}
          <br />
          {value.toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
          })}
        </span>
      );
    },
  },
  {
    title: "Duration",
    dataIndex: "duration",
    key: "duration",
    render: (value: number) => <span>{value} min</span>,
  },
  {
    title: "Teacher",
    dataIndex: "teacherId",
    key: "teacherId",
    render: (id: string) => {
      return (
        <Link to={`/dashboard/users/${id}`}>
          <SingleUserContextProvider id={id}>
            {(value) => {
              if (value.isLoading) {
                return <span>Loading...</span>;
              }
              if (value.error || !value.account) {
                return <span>Click to view</span>;
              }
              return <span>{value.account?.names}</span>;
            }}
          </SingleUserContextProvider>
        </Link>
      );
    },
  },
  {
    title: "Teacher Assistant",
    dataIndex: "assistant",
    key: "assistant",
    render: (info: any) => {
      return (
        <Link to={`/dashboard/users/${info.id}`}>
          <span>{info.name}</span>
        </Link>
      );
    },
  },
  {
    title: "School",
    dataIndex: "school",
    key: "school",
    render: (info: any) => {
      return (
        <Link to={`/dashboard/schools/${info.id}`}>
          <span>{info.name}</span>
        </Link>
      );
    },
  },

  {
    title: "Room",
    dataIndex: "room",
    key: "room",
  },
];

export default function TimeTablePage() {
  const [sidebarState, setSidebarState] = useState<SidebarProps>({
    open: false,
    trClass: null,
    onClose: handleCloseSidebar,
  });
  function handleCloseSidebar() {
    setSidebarState((prev) => ({ ...prev, open: false, trClass: null }));
  }

  function handleOpenSidebar(trClass: TrClass | null) {
    setSidebarState((prev) => ({
      ...prev,
      open: true,
      trClass,
      onClose: handleCloseSidebar,
    }));
  }
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const show = useToast();

  useEffect(() => {
    const getClass = async (id: string) => {
      try {
        const document = await getDoc(doc(firestore, "classes", id));
        const trClass: TrClass = document.data() as any;
        if (!document.exists() || !document.data() || !trClass.id) {
          show({
            message: "Oops, we couldn't find the class you're lloking for.",
            type: "error",
          });
          return;
        }
        handleOpenSidebar({ ...trClass, date: (trClass.date as any).toDate() });
      } catch (error: any) {
        show({
          message: error.message || Keys.DEFAULT_ERROR_MESSAGE,
          type: "error",
        });
      }
    };
    if (id) {
      getClass(id);
    }
  }, [id]);

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h1 className="font-bold text-lg">Teachers Schedule</h1>
        <button
          className="bg-primary text-white px-4 py-2 rounded"
          onClick={() => handleOpenSidebar(null)}
        >
          Add New
        </button>
      </div>
      <div className="bg-white rounded-md w-full">
        <TeacherClassesProvider>
          {(value) => {
            if (value.isLoading) {
              return <div className="p-4">Loading, please wait....</div>;
            }
            if (value.error) {
              return (
                <div className="p-4">
                  {value.error || Keys.DEFAULT_ERROR_MESSAGE}
                </div>
              );
            }
            return (
              <Table
                dataSource={value.trClasses.map((clas) => {
                  return {
                    ...clas,
                    assistant: {
                      id: clas.trAssistantId,
                      name: clas.trAssistantName,
                    },
                    course: {
                      id: clas.id,
                      name: clas.name,
                    },
                    school: {
                      id: clas.schoolId,
                      name: clas.schoolName,
                    },
                  };
                })}
                pagination={{
                  position: ["bottomRight"],
                  size: "small",
                  pageSize: 6,
                }}
                className="w-full overflow-x-auto"
              >
                {timeTableColumns.map((column) => (
                  <Column {...column} />
                ))}
                <Column
                  title="Action"
                  key="action"
                  render={(_: any, record: TrClass) => (
                    <SingleClassTileActions
                      trClass={record}
                      onEdit={(_) => handleOpenSidebar(record)}
                    />
                  )}
                />
              </Table>
            );
          }}
        </TeacherClassesProvider>

        <AddClassFormSidebar {...sidebarState} />
      </div>
    </div>
  );
}
