import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import TextInput from "../../../components/ui/input";
import { State } from "../../../interfaces/loading-state";
import { useToast } from "../../../providers/GlobalContext";

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
  date: new Date(),
  duration: 30,
  files: [],
  room: "Office365",
  schoolId: "",
  schoolName: "",
  teacherId: "",
  trAssistantId: "",
  trAssistantName: "",
};

const AddTeacherClassForm = () => {
  const [formData, setFormData] = useState<FormData>(initFormData);
  const [state, setState] = useState<State>(initState);
  const show = useToast();

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
    try {
      // const school: School = {
      //   name: formData.name,
      //   id: "",
      //   poManager: "",
      //   principalName: formData.principalName,
      //   principalPhone: formData.principalPhone,
      //   teachers: [],
      //   image: formData.image,
      //   description: formData.description,
      //   address: {
      //     location: formData.location,
      //     street: formData.street,
      //     mapLink: formData.mapLink,
      //   },
      //   createdAt: new Date(),
      //   updatedAt: new Date(),
      // };
      // const docRef = await addDoc(collection(firestore, "schools"), school);
      // setState((prev) => ({
      //   ...prev,
      //   loading: false,
      //   success: "School added successfully",
      // }));
      // setFormData(initFormData);
      // await updateDoc(docRef, { id: docRef.id });
    } catch (error: any) {
      setState((prev) => ({
        ...prev,
        loading: false,
        error: error.message || "Something went wrong, please try again later!",
      }));
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>): string => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    return "";
  };

  return (
    <div>
      <h1 className="font-bold text-lg">Add a new class</h1>
      <form className="bg-white p-10 rounded-md mt-4" onSubmit={handleSubmit}>
        <div className="grid md:grid-cols-2">
          <TextInput
            label="Course Title"
            name="name"
            placeholder="English"
            value={formData.name}
            onChange={handleChange}
          />
        </div>

        <button
          className="rounded-md bg-brand px-5 py-3 mt-2 text-sm font-medium  text-white"
          type="submit"
          disabled={state.loading}
        >
          {state.loading ? "Please wait..." : "SUBMIT"}
        </button>
      </form>
    </div>
  );
};

export default AddTeacherClassForm;
