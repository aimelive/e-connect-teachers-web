import { Drawer } from "antd";
import { ChangeEvent, FC, FormEvent, useEffect, useState } from "react";
import { TrClass } from "../../../interfaces/trClass";
import { State } from "../../../interfaces/loading-state";
import { useToast } from "../../../providers/GlobalContext";
import TextInput from "../../../components/ui/input";
import DateTimePicker from "../../../components/ui/DateTimePicker";
import dayjs from "dayjs";
import SingleUserContextProvider from "../../../providers/SingleUserContextProvider";
import AddInput from "../../../components/ui/AddInput";
import SingleSchoolContextProvider from "../../../providers/SingleSchoolContextProvider";
import AddSchoolInput from "../../../components/ui/AddSchoolInput";
import { SchoolsProvider } from "../../../providers/SchoolsProvider";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { firestore } from "../../../lib/config";

export interface SidebarProps {
  open: boolean;
  trClass: TrClass | null;
  onClose: () => void;
}

const initState: State = { loading: false, error: null };

interface FormData {
  name: string;
  date: Date;
  duration: number;
  files: string[];
  room: string;
  schoolId: string;
  schoolName: string;
  teacherId: string;
  trAssistantId: string;
  trAssistantName: string;
}

const initFormData: FormData = {
  name: "",
  date: dayjs(new Date()).add(2, "day").toDate(),
  duration: 30,
  files: [],
  room: "",
  schoolId: "",
  schoolName: "",
  teacherId: "",
  trAssistantId: "",
  trAssistantName: "",
};

const AddClassFormSidebar: FC<SidebarProps> = ({ open, trClass, onClose }) => {
  const [formData, setFormData] = useState<FormData>(initFormData);
  const [state, setState] = useState<State>(initState);

  const show = useToast();

  useEffect(() => {
    if (trClass) {
      setFormData({
        name: trClass.name,
        schoolId: trClass.schoolId,
        date: (trClass.date as any)?.toDate() || new Date(trClass.date),
        schoolName: trClass.schoolName,
        files: trClass.files.map((file) => file.link),
        room: trClass.room,
        trAssistantId: trClass.trAssistantId,
        trAssistantName: trClass.trAssistantName,
        teacherId: trClass.teacherId,
        duration: trClass.duration,
      });
    }
  }, [trClass]);

  useEffect(() => {
    if (state.loading) return;
    if (state.error) {
      show({ message: state.error, type: "error" });
    }
    if (state.success) {
      show({ message: state.success, type: "success" });
    }
  }, [state]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (state.loading) return;
    setState((prev) => ({
      ...prev,
      loading: true,
      error: null,
    }));
    if (!formData.teacherId || !formData.trAssistantId || !formData.schoolId) {
      setState((prev) => ({
        ...prev,
        loading: false,
        error:
          "Teacher, teacher assistant and school is required to add a class!",
      }));
      return;
    }
    try {
      const newTrClass: TrClass = {
        name: formData.name,
        date: formData.date,
        duration: formData.duration,
        createdAt: (trClass?.date as any)?.toDate() || new Date(),
        updatedAt: new Date(),
        room: formData.room,
        schoolId: formData.schoolId,
        schoolName: formData.schoolName,
        trAssistantId: formData.trAssistantId,
        trAssistantName: formData.trAssistantName,
        teacherId: formData.teacherId,
        id: trClass?.id || "",
        files: formData.files.map((link, index) => ({
          link,
          title: `File 0${index + 1}`,
        })),
      };
      if (trClass?.id) {
        await updateDoc(doc(firestore, "classes", trClass.id), {
          ...newTrClass,
        });
        setState((prev) => ({
          ...prev,
          loading: false,
          success: "Class updated successfully",
        }));
        onClose();
        return;
      }
      const docRef = await addDoc(collection(firestore, "classes"), newTrClass);
      setState((prev) => ({
        ...prev,
        loading: false,
        success: "Class added successfully",
      }));
      setFormData(initFormData);
      await updateDoc(docRef, { id: docRef.id });
      onClose();
    } catch (error: any) {
      setState((prev) => ({
        ...prev,
        loading: false,
        error: error.message || "Something went wrong, please try again later!",
      }));
    }
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ): string => {
    if (e.target.name.startsWith("files.")) {
      setFormData((prev) => {
        const files = prev.files;
        const index: number = Number(e.target.name.split(".")[1]);
        files[index] = e.target.value;
        return { ...prev, files };
      });
      return "";
    }

    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    return "";
  };

  const [files, setFiles] = useState(2);

  return (
    <Drawer
      open={open}
      placement={"right"}
      closable={true}
      onClose={onClose}
      title="New Class"
    >
      <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
        <TextInput
          label="Course Title"
          name="name"
          placeholder="Add class title"
          value={formData.name}
          onChange={handleChange}
        />
        <DateTimePicker
          value={formData.date}
          onChange={(value) => {
            setFormData((prev) => ({ ...prev, date: value }));
          }}
        />
        <div className="flex flex-col space-y-1">
          <span className="flex items-center space-x-1">
            <label htmlFor="duration">Duration</label>
            <span className="text-red-500">*</span>
          </span>
          <select
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            id="duration"
            className="rounded-md bg-gray-50  outline-none   px-4 py-2   w-full text-sm shadow-sm"
          >
            <option value={30}>30 MIN</option>
            <option value={40}>40 MIN</option>
            <option value={50}>50 MIN</option>
          </select>
        </div>
        <div className="flex flex-col space-y-1">
          <span className="flex items-center space-x-1">
            <label htmlFor="files">Files</label>
            <span className="text-red-500">*</span>
          </span>
          <div className="flex flex-col space-y-3">
            {new Array(files).fill(0).map((_, index) => {
              return (
                <div key={index} className="flex items-center space-x-2">
                  <div className="bg-primary px-1.5 text-white text-xs py-1 rounded-full">
                    {index != 9 ? "0" : ""}
                    {index + 1}
                  </div>
                  <TextInput
                    label=""
                    hideLabel={true}
                    name={"files." + index}
                    placeholder="Add a document link"
                    value={formData.files[index] || ""}
                    onChange={handleChange}
                  />
                </div>
              );
            })}
          </div>
          <div className="flex justify-end py-2">
            {files < 10 && (
              <button
                className="text-xs underline text-primary cursor-pointer"
                onClick={() => setFiles((prev) => prev + 1)}
              >
                Add new file link
              </button>
            )}
          </div>
        </div>

        <TextInput
          label="Class Room"
          name="room"
          placeholder="np.123"
          value={formData.room}
          onChange={handleChange}
        />
        <div className="flex flex-col space-y-1">
          <span className="flex items-center space-x-1">
            <label htmlFor="teacher">Class Teacher</label>
            <span className="text-red-500">*</span>
          </span>
          <SingleUserContextProvider id={formData.teacherId}>
            {(value) => {
              if (value.isLoading) {
                return <div>Please wait...</div>;
              }
              if (value.error) {
                return (
                  <AddInput
                    onChange={(id) =>
                      setFormData((prev) => ({ ...prev, teacherId: id }))
                    }
                  />
                );
              }
              return (
                <div className="flex space-x-2 py-2 items-center">
                  <img
                    src={value.account?.profile_pic}
                    width={40}
                    height={40}
                    alt="#"
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div className="flex-grow">
                    <p>{value.account?.names}</p>
                    <p className="text-xs">{value.account?.email}</p>
                  </div>
                  <button
                    className="bg-primary px-2 py-1 text-white rounded"
                    onClick={() => {
                      setFormData((prev) => ({ ...prev, teacherId: "" }));
                    }}
                  >
                    Remove
                  </button>
                </div>
              );
            }}
          </SingleUserContextProvider>
        </div>
        <div className="flex flex-col space-y-1">
          <span className="flex items-center space-x-1">
            <label htmlFor="assistant">Teacher Assistant</label>
            <span className="text-red-500">*</span>
          </span>
          <SingleUserContextProvider id={formData.trAssistantId}>
            {(value) => {
              if (value.isLoading) {
                return <div>Please wait...</div>;
              }
              if (value.error) {
                return (
                  <AddInput
                    onChange={(id, name) =>
                      setFormData((prev) => ({
                        ...prev,
                        trAssistantId: id,
                        trAssistantName: name,
                      }))
                    }
                  />
                );
              }

              return (
                <div className="flex space-x-2 py-2 items-center">
                  <img
                    src={value.account?.profile_pic}
                    width={40}
                    height={40}
                    alt="#"
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div className="flex-grow">
                    <p>{value.account?.names}</p>
                    <p className="text-xs">{value.account?.email}</p>
                  </div>
                  <button
                    className="bg-primary px-2 py-1 text-white rounded"
                    onClick={() => {
                      setFormData((prev) => ({ ...prev, trAssistantId: "" }));
                    }}
                  >
                    Remove
                  </button>
                </div>
              );
            }}
          </SingleUserContextProvider>
        </div>
        <div className="flex flex-col space-y-1">
          <span className="flex items-center space-x-1">
            <label htmlFor="school">School</label>
            <span className="text-red-500">*</span>
          </span>
          <SingleSchoolContextProvider id={formData.schoolId}>
            {(value) => {
              if (value.isLoading) {
                return <div>Please wait...</div>;
              }
              if (value.error) {
                return (
                  <SchoolsProvider>
                    <AddSchoolInput
                      onChange={(id, name) =>
                        setFormData((prev) => ({
                          ...prev,
                          schoolId: id,
                          schoolName: name,
                        }))
                      }
                    />
                  </SchoolsProvider>
                );
              }

              return (
                <div className="flex space-x-2 py-2 items-center">
                  <img
                    src={value.school?.image}
                    width={40}
                    height={40}
                    alt="#"
                    className="w-10 h-10 object-cover"
                  />
                  <div className="flex-grow">
                    <p>{value.school?.name}</p>
                    <p className="text-xs">{value.school?.description}</p>
                  </div>
                  <button
                    className="bg-primary px-2 py-1 text-white rounded"
                    onClick={() => {
                      setFormData((prev) => ({ ...prev, schoolId: "" }));
                    }}
                  >
                    Remove
                  </button>
                </div>
              );
            }}
          </SingleSchoolContextProvider>
        </div>
        <button
          className="rounded-md bg-brand px-5 py-3 mt-2 text-sm font-medium  text-white"
          type="submit"
          disabled={state.loading}
        >
          {state.loading ? "Please wait..." : "Save changes"}
        </button>
      </form>
    </Drawer>
  );
};

export default AddClassFormSidebar;
