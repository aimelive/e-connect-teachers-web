import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/login";
import { GlobalContextProvider } from "./providers/GlobalContext";
import ToastWrapper from "./components/Global/toastwrapper";
import Schools from "./pages/dashboard/school/schools";
import Users from "./pages/dashboard/users/Users";
import Teachers from "./pages/dashboard/teachers";
import Assistants from "./pages/dashboard/assistants";
import PoManagers from "./pages/dashboard/po-managers";
import Messages from "./pages/dashboard/messages";
import Events from "./pages/dashboard/events";
import Announcements from "./pages/dashboard/announcements";
import Splash from "./components/Global/Splash";
import Redirect from "./components/Global/Redirect";
import { NotificationsProvider } from "./providers/NotificationsProvider";
import SingleSchool from "./pages/dashboard/school/SingleSchool";
import Page404 from "./pages/Page404";
import SingleUser from "./pages/dashboard/users/SingleUser";
import HomePage from "./pages/dashboard/HomePage";
import DashboardLayout from "./pages/dashboard/layout/Layout";
import TimeTablePage from "./pages/dashboard/timetable/TimeTable";

function App() {
  return (
    <main className="text-sm">
      <Router>
        <GlobalContextProvider>
          {(value) => {
            if (!value.isLoggedIn && value.auth?.loading) {
              return <Splash />;
            }
            if (!value.isLoggedIn || !value.auth?.account) {
              return (
                <Routes>
                  <Route path="/" element={<ToastWrapper />}>
                    <Route path="/" element={<Login />} />
                    <Route path="*" element={<Redirect to="/" />} />
                  </Route>
                </Routes>
              );
            }
            return (
              <NotificationsProvider>
                <Routes>
                  <Route path="/" element={<ToastWrapper />}>
                    <Route path="/" element={<DashboardLayout />}>
                      <Route path="/" element={<Redirect to="/dashboard" />} />
                      <Route path="/dashboard" element={<HomePage />} />
                      <Route path="/dashboard/schools" element={<Schools />} />
                      <Route
                        path="/dashboard/schools/:id"
                        element={<SingleSchool />}
                      />
                      <Route path="/dashboard/users" element={<Users />} />
                      <Route
                        path="/dashboard/users/:id"
                        element={<SingleUser />}
                      />
                      <Route
                        path="/dashboard/teachers"
                        element={<Teachers />}
                      />
                      <Route
                        path="/dashboard/assistants"
                        element={<Assistants />}
                      />
                      <Route
                        path="/dashboard/po-managers"
                        element={<PoManagers />}
                      />
                      <Route
                        path="/dashboard/messages"
                        element={<Messages />}
                      />
                      <Route path="/dashboard/events" element={<Events />} />
                      <Route
                        path="/dashboard/announcements"
                        element={<Announcements />}
                      />
                      <Route
                        path="/dashboard/time-table"
                        element={<TimeTablePage />}
                      />
                      <Route path="*" element={<Page404 />} />
                    </Route>
                  </Route>
                </Routes>
              </NotificationsProvider>
            );
          }}
        </GlobalContextProvider>
      </Router>
    </main>
  );
}

export default App;
