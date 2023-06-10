import TextInput from "../../../components/ui/input";
import { Table } from "antd";
import { Link } from "react-router-dom";
import { UsersListProvider } from "../../../providers/UsersListProvider";
import { State } from "../../../interfaces/loading-state";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useToast } from "../../../providers/GlobalContext";
import { firestore } from "../../../lib/config";
import { addDoc, collection } from "firebase/firestore";
import { Account } from "../../../interfaces/account";
import { Keys } from "../../../lib/keys";
import { useCurrentUser } from "../../../lib/hooks/auth";
import { Role } from "../../../lib/utils";

const initState: State = { loading: false, error: null };

interface FormData {
  names: string;
  email: string;
  password: string;
  role: string;
  profile_pic: string;
  tel: string;
}

const initFormData: FormData = {
  names: "",
  email: "",
  password: "",
  role: "Teacher",
  profile_pic: "",
  tel: "",
};

const NewUser = () => {
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
      const account: Account = {
        id: "",
        fcm_id: "",
        names: formData.names,
        profile_pic: formData.profile_pic,
        role: {
          id: formData.role,
          name: formData.role,
          status: true,
          created_at: new Date(),
        },
        tel: formData.tel,
        status: false,
        email: formData.email,
        created_at: new Date(),
      };

      await addDoc(collection(firestore, "users"), {
        ...account,
        password: formData.password,
      });
      setState((prev) => ({
        ...prev,
        loading: false,
        success: "User created successfully!",
      }));
      setFormData(initFormData);
    } catch (error: any) {
      setState((prev) => ({
        ...prev,
        loading: false,
        error: error.message || Keys.DEFAULT_ERROR_MESSAGE,
      }));
    }
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ): string => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    return "";
  };

  return (
    <div className="bg-white px-6 md:px-10  py-4 rounded-md">
      <h1 className=" font-bold my-2">Add a new user</h1>
      <form onSubmit={handleSubmit}>
        <div className="grid md:grid-cols-2 gap-4 my-1">
          <TextInput
            label="Full Name"
            placeholder="John Doe"
            disabled={state.loading}
            name="names"
            value={formData.names}
            onChange={handleChange}
          />
          <TextInput
            label="Email address"
            placeholder="johndoe@gmail.com"
            disabled={state.loading}
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          <TextInput
            label="Phone Number"
            placeholder="325.7834.489"
            disabled={state.loading}
            type="tel"
            name="tel"
            value={formData.tel}
            onChange={handleChange}
          />
          <TextInput
            label="Password "
            placeholder="••••••••••"
            disabled={state.loading}
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          <TextInput
            label="Profile Picture"
            placeholder="https://www.google.com"
            disabled={state.loading}
            name="profile_pic"
            value={formData.profile_pic}
            onChange={handleChange}
          />
          <div>
            <label htmlFor="role">Role</label> <br />
            <select
              name="role"
              disabled={state.loading}
              value={formData.role}
              onChange={handleChange}
              id="role"
              className="rounded-md bg-gray-50  outline-none   px-4 py-2   w-full text-sm shadow-sm"
            >
              <option value="Teacher">TEACHER</option>
              <option value="Teacher Assistant">TEACHER ASSISTANT</option>
              <option value="PO Manager">PO-MANAGER</option>
            </select>
          </div>
        </div>
        <button
          className="rounded-md bg-brand px-4 py-3 mt-6 text-sm font-medium  text-white"
          type="submit"
          disabled={state.loading}
        >
          {state.loading ? "Please wait..." : "Add user"}
        </button>
      </form>
    </div>
  );
};

const column = [
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
    dataIndex: "info",
    key: "info",
    render: (info: any) => (
      <Link to={`/dashboard/users/${info.id}`}>{info.name}</Link>
    ),
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "Phone Number",
    dataIndex: "tel",
    key: "tel",
  },
  {
    title: "Role",
    dataIndex: "role",
    key: "role",
    render: (role: any) => {
      return <span>{role.name}</span>;
    },
  },
];

export default function UsersPage() {
  const { role } = useCurrentUser();
  const hash = window.location.hash.substring(1);

  useEffect(() => {
    if (hash) {
      setTimeout(() => {
        const div = document.getElementById(hash);
        if (!div) return;
        const yOffset = -100;
        const y = div.getBoundingClientRect().top + window.scrollY + yOffset;

        window.scrollTo({ top: y, behavior: "smooth" });
      }, 100);
    }
  }, [hash]);

  if (role !== Role.Admin) {
    return (
      <div className="p-10 rounded-md bg-white">
        <h1>This page can only be accessed by an admin.</h1>
      </div>
    );
  }
  return (
    <div>
      <NewUser />

      <UsersListProvider
        where={{
          field: "status",
          filter: "==",
          equal: true,
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
            <div className="mt-6 px-6 md:px-10 py-6 bg-white rounded-md">
              <h1 className=" font-bold  my-2" id="teachers">
                Teachers
              </h1>
              <Table
                columns={column}
                className="w-full overflow-x-auto"
                dataSource={value.users
                  .map((user) => ({
                    ...user,
                    info: { name: user.names, id: user.id },
                  }))
                  .filter((user) => user.role.name === "Teacher")}
                pagination={{
                  position: ["bottomRight"],
                  size: "small",
                  pageSize: 6,
                }}
              />
              <h1 className=" font-bold  my-2" id="assistants">
                Teachers' Assistants
              </h1>
              <Table
                columns={column}
                className="w-full overflow-x-auto"
                dataSource={value.users
                  .map((user) => ({
                    ...user,
                    info: { name: user.names, id: user.id },
                  }))
                  .filter((user) => user.role.name === "Teacher Assistant")}
                pagination={{
                  position: ["bottomRight"],
                  size: "small",
                  pageSize: 6,
                }}
              />
              <h1 className=" font-bold  my-2" id="po-managers">
                PO Managers
              </h1>
              <Table
                columns={column}
                className="w-full overflow-x-auto"
                dataSource={value.users
                  .map((user) => ({
                    ...user,
                    info: { name: user.names, id: user.id },
                  }))
                  .filter((user) => user.role.name === "PO Manager")}
                pagination={{
                  position: ["bottomRight"],
                  size: "small",
                  pageSize: 6,
                }}
              />
            </div>
          );
        }}
      </UsersListProvider>
    </div>
  );
}
