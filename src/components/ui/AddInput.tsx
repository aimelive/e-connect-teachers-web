import { useState } from "react";
import IsAddingTeacherModal from "../shared/IsAddingTeacherModal";

const AddInput = ({
  onChange,
  select,
}: {
  onChange: (id: string, name: string) => void;
  select: "Teacher" | "Teacher Assistant";
}) => {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <div className="flex flex-col items-center justify-center p-4 px-8 space-y-4 border rounded-lg">
        <img src="/icons/menu/school.svg" className="w-8 h-8" />
        <p className="text-xs text-center">
          Click the button below to automatically add a teacher to this class
        </p>
        <button
          className="text-xs bg-primary px-4 py-1 text-white rounded"
          // disabled
          onClick={() => setShowModal(true)}
        >
          + Add a teacher
        </button>
      </div>
      <IsAddingTeacherModal
        select={select}
        open={showModal}
        onClose={() => setShowModal(false)}
        onAdd={onChange}
        exclude={[]}
      />
    </>
  );
};

export default AddInput;
