import { useNavigate, useParams } from "react-router-dom";
import { TeachersList } from "./TeachersList";
import SingleSchoolContextProvider from "../../../providers/SingleSchoolContextProvider";
import { Keys } from "../../../lib/keys";
import SchoolDetailsSection from "./SchoolDetailsSection";
import { Button, Modal } from "antd";
import { useState } from "react";
import { useToast } from "../../../providers/GlobalContext";
import { deleteDoc, doc } from "firebase/firestore";
import { firestore } from "../../../lib/config";
import { useCurrentUser } from "../../../lib/hooks/auth";
import { Role } from "../../../lib/utils";
import { TeachersAssistantList } from "./TrAssistantsList";

export default function SingleSchool() {
  const { id } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const show = useToast();
  const nav = useNavigate();
  const { role } = useCurrentUser();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    setIsLoading(true);
    try {
      await deleteDoc(doc(firestore, "schools", id!));
      show({ type: "success", message: "School has deleted successfully!" });
      setIsModalOpen(false);
      nav("/dashboard/schools");
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

  const handleBack = () => {
    history.back();
  };

  return (
    <div className="p-5 md:p-10 rounded-md bg-white w-full overflow-hidden">
      <SingleSchoolContextProvider id={id || ""}>
        {(value) => {
          if (value.isLoading) {
            return <div>Loading, please wait....</div>;
          }
          if (value.error || !value.school) {
            return <div>{value.error || Keys.DEFAULT_ERROR_MESSAGE}</div>;
          }

          return (
            <>
              <div className="flex items-center gap-6 pb-10 border-b">
                <button
                  onClick={handleBack}
                  className="flex items-center gap-2 bg-slate-100 rounded-full p-3 text-sm"
                >
                  <img
                    src="/icons/arrow-right.svg"
                    alt=""
                    className="w-4 h-4"
                  />
                </button>
                <h1 className="font-bold text-xl">{value.school.name}</h1>
              </div>
              <SchoolDetailsSection school={value.school} />
              <div>
                <div className="my-3">
                  <TeachersList
                    teachers={value.school.teachers}
                    schoolId={value.school.id}
                  />
                  <TeachersAssistantList
                    teachers={value.school.teachers}
                    schoolId={value.school.id}
                  />
                  {role === Role.Admin && (
                    <>
                      <hr />
                      <h1 className=" font-bold text-lg my-6">Danger zone</h1>
                      <div className="flex items-center justify-between bg-red-50 rounded-md p-4">
                        <div>
                          <h1 className=" font-bold">Delete school</h1>
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
                          <p>
                            This action can not be undone and will have an
                            effect.
                          </p>
                          <p>
                            Are you sure do you want to delete{" "}
                            <span className="font-semibold">
                              {value.school.name}
                            </span>{" "}
                            ?
                          </p>
                        </Modal>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </>
          );
        }}
      </SingleSchoolContextProvider>
    </div>
  );
}
