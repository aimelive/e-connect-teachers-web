import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import TextInput from "../../../components/ui/input";
import { Table } from "antd";
import { Link } from "react-router-dom";
import {
  SchoolsProvider,
  useSchools,
} from "../../../providers/SchoolsProvider";
import { Address, School } from "../../../interfaces/school";
import { State } from "../../../interfaces/loading-state";
import { addDoc, collection, updateDoc } from "firebase/firestore";
import { firestore } from "../../../lib/config";
import { useToast } from "../../../providers/GlobalContext";

const initState: State = { loading: false, error: null };

interface FormData {
  name: string;
  principalName: string;
  principalPhone: string;
  image: string;
  location: string;
  street: string;
  mapLink: string;
  description: string;
}

const initFormData: FormData = {
  name: "",
  principalName: "",
  principalPhone: "",
  image: "",
  location: "",
  street: "",
  mapLink: "",
  description: "",
};

export const NewSchool = () => {
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
      const school: School = {
        name: formData.name,
        id: "",
        poManager: "",
        principalName: formData.principalName,
        principalPhone: formData.principalPhone,
        teachers: [],
        image: formData.image,
        description: formData.description,
        address: {
          location: formData.location,
          street: formData.street,
          mapLink: formData.mapLink,
        },
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      const docRef = await addDoc(collection(firestore, "schools"), school);
      setState((prev) => ({
        ...prev,
        loading: false,
        success: "School added successfully",
      }));
      setFormData(initFormData);
      await updateDoc(docRef, { id: docRef.id });
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
    <div className="bg-white  p-6 md:px-10  py-4 rounded-md" id="new">
      <h1 className=" font-bold my-2">Add a new school</h1>
      <form onSubmit={handleSubmit}>
        <div className="grid md:grid-cols-2 gap-4 my-1">
          <TextInput
            label="School name"
            name="name"
            placeholder="Khan Academy"
            value={formData.name}
            onChange={handleChange}
          />
          <TextInput
            label="Principal name"
            name="principalName"
            placeholder="Dr. John Doe"
            value={formData.principalName}
            onChange={handleChange}
          />
          <TextInput
            label="Principal Tel"
            name="principalPhone"
            placeholder="+32 768 574 688"
            type="tel"
            value={formData.principalPhone}
            onChange={handleChange}
          />
          <TextInput
            label="School's location"
            name="location"
            placeholder="Middle City"
            value={formData.location}
            onChange={handleChange}
          />
          <TextInput
            label="School's street"
            name="street"
            placeholder="NM 504 St"
            value={formData.street}
            onChange={handleChange}
          />
          <TextInput
            label="School's Map Link"
            name="mapLink"
            placeholder="https://maps.google.com/vietnam"
            value={formData.mapLink}
            onChange={handleChange}
          />
          <TextInput
            label="Description"
            name="description"
            placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit....."
            value={formData.description}
            onChange={handleChange}
          />
          <TextInput
            label="School Image - URL"
            name="image"
            placeholder="https://image.png"
            value={formData.image}
            onChange={handleChange}
          />
        </div>
        <button
          className="rounded-md bg-brand px-5 py-3 mt-2 text-sm font-medium  text-white"
          type="submit"
          disabled={state.loading}
        >
          {state.loading ? "Please wait..." : "Add school"}
        </button>
      </form>
    </div>
  );
};

const column = [
  {
    title: "Image",
    dataIndex: "image",
    key: "image",
    render: (image: string) => (
      <img src={image} alt="#" width={40} height={40} />
    ),
  },
  {
    title: "School name",
    dataIndex: "info",
    key: "info",
    render: (info: any) => (
      <Link to={"/dashboard/schools/" + info.id}>{info.name}</Link>
    ),
  },
  {
    title: "Description",
    dataIndex: "description",
    key: "description",
  },
  {
    title: "Address",
    dataIndex: "address",
    key: "address",
    render: (address: Address) => (
      <a href={address.mapLink} target="_blank" className="text-blue-500">
        {address.location}
      </a>
    ),
  },
  {
    title: "Principal",
    dataIndex: "principalName",
    key: "principalName",
  },
];
export const SchoolsList = () => {
  const { schools } = useSchools();

  return (
    <div className="mt-6 p-4 md:px-10 md:py-6 bg-white rounded-md">
      <h1 className=" font-bold  my-2">Registered Schools</h1>
      <Table
        className="w-full overflow-x-auto"
        columns={column}
        dataSource={schools.map((school) => ({
          ...school,
          info: { name: school.name, id: school.id },
        }))}
        pagination={{ position: ["bottomRight"], size: "small", pageSize: 6 }}
      />
    </div>
  );
};

export default function Schools() {
  return (
    <div>
      <NewSchool />
      <SchoolsProvider>{(_value) => <SchoolsList />}</SchoolsProvider>
    </div>
  );
}
