import { Link } from "react-router-dom";
import { SchoolsProvider } from "../../providers/SchoolsProvider";
import { TeacherClassesProvider } from "../../providers/TeacherClassesContextProvider";
import { UsersListProvider } from "../../providers/UsersListProvider";
import SingleUserContextProvider from "../../providers/SingleUserContextProvider";
import Utils from "../../lib/utils";
import dayjs from "dayjs";

const HomePage = () => {
  return (
    <div>
      <div className="grid sm:grid-cols-3 md:grid-cols-5 gap-6 text-center">
        <UsersListProvider where={{ field: "id", equal: "", filter: "!=" }}>
          {(value) => {
            return (
              <>
                <div className="bg-brand text-white bg-opacity-40 shadow flex items-center justify-center flex-col space-y-4 p-6 px-8 rounded-2xl">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="icon icon-tabler icon-tabler-users"
                    width="25"
                    height="25"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="currentColor"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                    <path d="M9 7m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0"></path>
                    <path d="M3 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2"></path>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                    <path d="M21 21v-2a4 4 0 0 0 -3 -3.85"></path>
                  </svg>
                  <span className="text-xl font-bold">
                    {
                      value.users.filter(
                        (user) => user.role.name.toLowerCase() === "teacher"
                      ).length
                    }
                  </span>
                  <span>Teachers</span>
                </div>
                <div className="bg-primary text-white shadow flex items-center justify-center flex-col space-y-4 p-6 px-8 rounded-2xl">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="icon icon-tabler icon-tabler-users"
                    width="25"
                    height="25"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="currentColor"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                    <path d="M9 7m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0"></path>
                    <path d="M3 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2"></path>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                    <path d="M21 21v-2a4 4 0 0 0 -3 -3.85"></path>
                  </svg>
                  <span className="text-xl font-bold">
                    {
                      value.users.filter((user) =>
                        user.role.name.toLowerCase().includes("assistant")
                      ).length
                    }
                  </span>
                  <span>Teacher Assistants</span>
                </div>
                <div className="bg-blue-300 text-white shadow flex items-center justify-center flex-col space-y-4 p-6 px-8 rounded-2xl">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="icon icon-tabler icon-tabler-users"
                    width="25"
                    height="25"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="currentColor"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                    <path d="M9 7m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0"></path>
                    <path d="M3 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2"></path>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                    <path d="M21 21v-2a4 4 0 0 0 -3 -3.85"></path>
                  </svg>
                  <span className="text-xl font-bold">
                    {
                      value.users.filter((user) =>
                        user.role.name.toLowerCase().includes("po")
                      ).length
                    }
                  </span>
                  <span>PO Managers</span>
                </div>
              </>
            );
          }}
        </UsersListProvider>

        <div className="bg-brand text-white shadow flex items-center justify-center flex-col space-y-4 p-6 px-8 rounded-2xl">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="icon icon-tabler icon-tabler-school"
            width="25"
            height="25"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
            <path d="M22 9l-10 -4l-10 4l10 4l10 -4v6"></path>
            <path d="M6 10.6v5.4a6 3 0 0 0 12 0v-5.4"></path>
          </svg>
          <SchoolsProvider>
            {(value) => {
              return (
                <span className="text-xl font-bold">
                  {value.schools.length}
                </span>
              );
            }}
          </SchoolsProvider>
          <span>Schools</span>
        </div>
        <div className="bg-gray-400 text-white shadow flex items-center justify-center flex-col space-y-4 p-6 px-8 rounded-2xl">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="25"
            height="25"
            viewBox="0 0 24 24"
          >
            <path
              fill="white"
              d="M14 12h1.5v2.82l2.44 1.41l-.75 1.3L14 15.69V12M4 2h14a2 2 0 0 1 2 2v6.1c1.24 1.26 2 2.99 2 4.9a7 7 0 0 1-7 7c-1.91 0-3.64-.76-4.9-2H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2m0 13v3h4.67c-.43-.91-.67-1.93-.67-3H4m0-7h6V5H4v3m14 0V5h-6v3h6M4 13h4.29c.34-1.15.97-2.18 1.81-3H4v3m11-2.85A4.85 4.85 0 0 0 10.15 15c0 2.68 2.17 4.85 4.85 4.85A4.85 4.85 0 0 0 19.85 15c0-2.68-2.17-4.85-4.85-4.85Z"
            />
          </svg>
          <TeacherClassesProvider>
            {(value) => {
              return (
                <span className="text-xl font-bold">
                  {value.trClasses.length}
                </span>
              );
            }}
          </TeacherClassesProvider>
          <span>Total Classes</span>
        </div>
      </div>
      <h1 className="font-bold text-lg text-brand my-4">Today's classes</h1>
      <TeacherClassesProvider>
        {(value) => {
          if (value.isLoading) {
            return <h1 className="p-4">Loading, please wait...</h1>;
          }
          if (!value.trClasses.length) {
            return <h1 className="p-4">No classes assigned to you today!</h1>;
          }
          return (
            <>
              <div>
                <div>
                  <div className="grid md:grid-cols-2 gap-4">
                    {value.trClasses
                      .filter((el) => Utils.isToday(el.date))
                      .slice(0, 10)
                      .map((trClass, index) => {
                        return (
                          <div
                            className="bg-white p-2 px-3 rounded flex items-center space-x-3 mb-3"
                            key={index}
                          >
                            <Link
                              to={`/dashboard/time-table/${trClass.id}`}
                              className="bg-primary p-3 text-white rounded-lg shadow-xl"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="icon icon-tabler icon-tabler-users"
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                strokeWidth="2"
                                stroke="currentColor"
                                fill="none"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <path
                                  stroke="none"
                                  d="M0 0h24v24H0z"
                                  fill="none"
                                ></path>
                                <path d="M9 7m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0"></path>
                                <path d="M3 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2"></path>
                                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                                <path d="M21 21v-2a4 4 0 0 0 -3 -3.85"></path>
                              </svg>
                            </Link>
                            <div className="flex-grow text-xs">
                              <p className="font-semibold text-sm">
                                <Link
                                  to={`/dashboard/time-table/${trClass.id}`}
                                >
                                  {trClass.name}
                                </Link>
                              </p>
                              <p>
                                <Link
                                  to={`/dashboard/schools/${trClass.schoolId}`}
                                  className="hover:text-blue-500 hover:underline"
                                >
                                  {trClass.schoolName}
                                </Link>
                              </p>
                              <p>
                                <SingleUserContextProvider
                                  id={trClass.teacherId}
                                >
                                  {(value) => {
                                    if (value.isLoading) {
                                      return <span>Loading...</span>;
                                    }
                                    if (value.error || !value.account) {
                                      return <span>Click to view teacher</span>;
                                    }
                                    return (
                                      <span>
                                        <span>
                                          <Link
                                            to={`/dashboard/users/${trClass.teacherId}`}
                                            className="hover:text-blue-500 hover:underline font-[480]"
                                          >
                                            Tr. {value.account.names}
                                          </Link>
                                        </span>{" "}
                                        and{" "}
                                      </span>
                                    );
                                  }}
                                </SingleUserContextProvider>
                                <span>
                                  <Link
                                    to={`/dashboard/users/${trClass.trAssistantId}`}
                                    className="hover:text-blue-500 hover:underline font-[480]"
                                  >
                                    Ass. {trClass.trAssistantName}
                                  </Link>
                                </span>
                              </p>
                            </div>
                            <p className="bg-brand bg-opacity-50 p-2 py-1 rounded text-xs text-white font-semibold">
                              {trClass.date.toLocaleTimeString("en-US", {
                                hour: "numeric",
                                minute: "2-digit",
                                hour12: true,
                              })}{" "}
                              -{" "}
                              {dayjs(trClass.date)
                                .add(trClass.duration, "minute")
                                .toDate()
                                .toLocaleTimeString("en-US", {
                                  hour: "numeric",
                                  minute: "2-digit",
                                  hour12: true,
                                })}{" "}
                            </p>
                          </div>
                        );
                      })}
                  </div>
                  <div className="flex justify-end text-brand hover:text-primary underline">
                    <Link to="/dashboard/time-table" className="">
                      Go to Time Table
                    </Link>
                  </div>
                </div>
              </div>
            </>
          );
        }}
      </TeacherClassesProvider>
    </div>
  );
};

export default HomePage;
