import { useState } from "react";
import { Modal } from "antd";
import { Link } from "react-router-dom";
import { useSchools } from "../../providers/SchoolsProvider";

const AddSchoolInput = ({
  onChange,
}: {
  onChange: (id: string, name: string) => void;
}) => {
  const [showModal, setShowModal] = useState(false);
  const { schools } = useSchools();
  return (
    <>
      <div className="flex flex-col items-center justify-center p-4 px-8 space-y-4 border rounded-lg">
        <img src="/icons/menu/school.svg" className="w-8 h-8" />
        <p className="text-xs text-center">
          Click the button below to automatically assign this class to a school
        </p>
        <button
          className="text-xs bg-primary px-4 py-1 text-white rounded"
          onClick={() => setShowModal(true)}
        >
          + Assign
        </button>
      </div>
      <Modal
        open={showModal}
        onOk={() => setShowModal(false)}
        onCancel={() => setShowModal(false)}
        footer={null}
      >
        <h1 className="font-bold text-lg">
          Assign a class to one of the following schools
        </h1>
        <p>
          If the school you want to add in the system, first add them{" "}
          <Link to={"/dashboard/schools#new"}>
            <span className="text-blue-500">here</span>
          </Link>
        </p>
        <div className="teachers bg-gray-50 px-2 mt-2">
          {schools.map((school) => {
            return (
              <div
                key={school.id}
                className="py-2 hover:bg-brand/20 px-4 cursor-pointer rounded-md flex items-center space-x-2 my-1"
                onClick={() => onChange(school.id, school.name)}
              >
                <img
                  src={school.image}
                  alt="#"
                  width={40}
                  height={40}
                  className="w-10 h-10"
                />
                <div>
                  <h1 className=" font-bold">{school.name}</h1>
                  <p className="">{school.description} </p>
                </div>
              </div>
            );
          })}
        </div>
      </Modal>
    </>
  );
};

export default AddSchoolInput;
