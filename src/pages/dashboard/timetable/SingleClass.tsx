import { Link, useParams } from "react-router-dom";
import SingleClassContextProvider from "../../../providers/SingleClassContextProvider";
import dayjs from "dayjs";
import SingleUserContextProvider from "../../../providers/SingleUserContextProvider";
import { FeedbacksProvider } from "../../../providers/FeedbacksProvider";
import { useState } from "react";
import { Button, Modal } from "antd";
import { useToast } from "../../../providers/GlobalContext";
import { Keys } from "../../../lib/keys";
import { addDoc, collection } from "firebase/firestore";
import { firestore } from "../../../lib/config";
import { Feedback } from "../../../interfaces/feedback";

const SingleClass = () => {
  const { id } = useParams();
  const [showAddFeedbackModal, setShowAddFeedbackModal] = useState<{
    show: boolean;
    to: "Teacher" | "Teacher Assistant" | null;
    loading: boolean;
    value: string;
  }>({ show: false, to: null, loading: false, value: "" });
  const show = useToast();

  const handleOk = async () => {
    if (!showAddFeedbackModal.value || showAddFeedbackModal.loading) return;
    setShowAddFeedbackModal((prev) => ({ ...prev, loading: true }));
    try {
      const feedback: Feedback = {
        to: showAddFeedbackModal.to!,
        feedback: showAddFeedbackModal.value,
        classId: id!,
        rate: 3,
      };
      await addDoc(collection(firestore, "feedbacks"), {
        ...feedback,
        createdAt: new Date(),
      });
      show({ type: "success", message: "Feedback added successfully!" });
      setShowAddFeedbackModal((prev) => ({ ...prev, show: false, value: "" }));
    } catch (error: any) {
      show({
        type: "success",
        message: error.message || Keys.DEFAULT_ERROR_MESSAGE,
      });
    } finally {
      setShowAddFeedbackModal((prev) => ({ ...prev, loading: false }));
    }
  };

  const handleCancel = () => {
    setShowAddFeedbackModal((prev) => ({
      ...prev,
      show: false,
      to: null,
      loading: false,
      value: "",
    }));
  };

  const handleBack = () => {
    history.back();
  };

  return (
    <div className="p-6 md:p-10 rounded-md bg-white">
      <SingleClassContextProvider id={id!}>
        {(value) => {
          if (value.isLoading) {
            return <div>Loading, please wait...</div>;
          }
          if (value.error) {
            return <div>{value.error}</div>;
          }
          return (
            <div>
              <div className="flex items-center gap-6 pb-5 border-b">
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
                <h1 className="font-bold text-xl">{value.trClass?.name}</h1>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <div className="my-3">
                    <h1 className="font-[500]">Date/time</h1>
                    <p className="py-2">
                      {value.trClass?.date?.toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                      {" / "}
                      {value.trClass?.date?.toLocaleTimeString("en-US", {
                        hour: "numeric",
                        minute: "2-digit",
                        hour12: true,
                      })}
                      {" - "}
                      {dayjs(value.trClass?.date)
                        .add(value.trClass!.duration, "minute")
                        .toDate()
                        .toLocaleTimeString("en-US", {
                          hour: "numeric",
                          minute: "2-digit",
                          hour12: true,
                        })}
                    </p>
                  </div>
                  <div className="my-3">
                    <h1 className="font-[500]">School</h1>
                    <p className="py-2 hover:underline">
                      <Link
                        to={`/dashboard/schools/${value.trClass?.schoolId}`}
                      >
                        {value.trClass?.schoolName}
                      </Link>
                    </p>
                  </div>
                  <div className="my-3">
                    <h1 className="font-[500]">Class Teacher</h1>
                    <SingleUserContextProvider id={value.trClass!.teacherId}>
                      {(value) => {
                        return (
                          <div className="flex space-x-2 items-center my-2 p-2 rounded-lg">
                            <Link to={`/dashboard/users/${value.account?.id}`}>
                              <img
                                src={value.account?.profile_pic}
                                className="w-14 h-14 rounded-full"
                              />
                            </Link>

                            <div className="flex-grow">
                              <p className="font-semibold">
                                {value.account?.names}
                              </p>
                              <p>{value.account?.role?.name}</p>
                              <p className="text-xs">{value.account?.tel}</p>
                            </div>
                            <div
                              className="p-2 hover:bg-slate-100 cursor-pointer rounded-full"
                              onClick={() => {
                                setShowAddFeedbackModal((prev) => ({
                                  ...prev,
                                  show: true,
                                  to: "Teacher",
                                  value: "",
                                }));
                              }}
                            >
                              <img src="/icons/menu/chat.svg" width={20} />
                            </div>
                          </div>
                        );
                      }}
                    </SingleUserContextProvider>
                  </div>
                  <div className="my-3">
                    <h1 className="font-[500]">Teacher Assistant</h1>
                    <SingleUserContextProvider
                      id={value.trClass!.trAssistantId}
                    >
                      {(value) => {
                        return (
                          <div className="flex space-x-2 items-center my-2 p-2 rounded-lg">
                            <Link to={`/dashboard/users/${value.account?.id}`}>
                              <img
                                src={value.account?.profile_pic}
                                className="w-14 h-14 rounded-full"
                              />
                            </Link>

                            <div className="flex-grow">
                              <p className="font-semibold">
                                {value.account?.names}
                              </p>
                              <p>{value.account?.role?.name}</p>
                              <p className="text-xs">{value.account?.tel}</p>
                            </div>
                            <div
                              className="p-2 hover:bg-slate-100 cursor-pointer rounded-full"
                              onClick={() => {
                                setShowAddFeedbackModal((prev) => ({
                                  ...prev,
                                  show: true,
                                  to: "Teacher Assistant",
                                  value: "",
                                }));
                              }}
                            >
                              <img src="/icons/menu/chat.svg" width={20} />
                            </div>
                          </div>
                        );
                      }}
                    </SingleUserContextProvider>
                  </div>
                </div>
                <div>
                  <div className="my-3">
                    <div className="flex items-center justify-between">
                      <h1 className="font-[500]">Lesson Files</h1>
                      <Link
                        to={"/dashboard/time-table?id=" + id}
                        className="text-xs underline text-primary"
                      >
                        Add a file
                      </Link>
                    </div>

                    <div className="grid gap-2 py-2">
                      {value.trClass?.files.map((file, index) => {
                        return (
                          <a
                            href={file.link}
                            target="_blank"
                            key={index}
                            className="text-brand hover:underline whitespace-nowrap overflow-hidden"
                          >
                            {file.link}
                          </a>
                        );
                      })}
                    </div>
                  </div>
                  <div className="my-3">
                    <h1 className="font-[500]">Feedbacks</h1>
                    <div className="py-2">
                      <FeedbacksProvider classId={value.trClass!.id}>
                        {(value) => {
                          if (value.isLoading) {
                            return <div>Loading, please wait...</div>;
                          }
                          if (value.error) {
                            return <div>{value.error}</div>;
                          }
                          if (value.feedbacks.length === 0) {
                            return <div>No feedbacks yet!</div>;
                          }
                          return (
                            <div>
                              {value.feedbacks.map((feedback, index) => {
                                return (
                                  <div
                                    key={index}
                                    className="bg-slate-100 p-4 rounded-lg my-2 text-sm"
                                  >
                                    <p className="text-primary font-semibold">
                                      To {feedback.to}
                                    </p>
                                    <p>{feedback.feedback}</p>
                                  </div>
                                );
                              })}
                            </div>
                          );
                        }}
                      </FeedbacksProvider>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        }}
      </SingleClassContextProvider>
      <Modal
        title="Add your feedback"
        open={showAddFeedbackModal.show}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel} danger>
            Cancel
          </Button>,
          <Button
            key="submit"
            type="primary"
            loading={showAddFeedbackModal.loading}
            onClick={handleOk}
            danger
          >
            SUBMIT
          </Button>,
        ]}
      >
        <p>
          Provide your feedback to{" "}
          <span className="font-semibold">{showAddFeedbackModal.to}</span>
        </p>
        <textarea
          className="border w-full resize-none px-3 py-2 rounded-md my-2"
          value={showAddFeedbackModal.value}
          onChange={(e) =>
            setShowAddFeedbackModal((prev) => ({
              ...prev,
              value: e.target.value,
            }))
          }
          placeholder="Enter your feedback here..."
          rows={4}
        />
      </Modal>
    </div>
  );
};

export default SingleClass;
