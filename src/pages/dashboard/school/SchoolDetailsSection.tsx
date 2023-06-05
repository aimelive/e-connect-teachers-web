import { ChangeEvent, FC, useEffect, useState } from "react";
import { School } from "../../../interfaces/school";
import Utils from "../../../lib/utils";
import { useToast } from "../../../providers/GlobalContext";
import { doc, updateDoc } from "firebase/firestore";
import { firestore } from "../../../lib/config";

const SchoolDetailsSection: FC<{ school: School }> = ({ school }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [schoolData, setSchoolData] = useState<School>(school);
  const show = useToast();

  const handleSaveChanges = async () => {
    const newObj = Utils.compareObj(school, schoolData);
    if (!Object.keys(newObj).length) {
      show({ type: "error", message: "No changes made" });
      return;
    }
    setLoading(true);
    await updateDoc(doc(firestore, "schools", school.id), newObj);
    show({ type: "success", message: "School updated successfully!" });
    setIsEditing(false);
    setLoading(false);
  };

  useEffect(() => {
    setSchoolData(school);
  }, [school]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (e.target.name.startsWith("address.")) {
      setSchoolData((prev) => ({
        ...prev,
        address: {
          ...prev.address,
          [e.target.name.split(".")[1]]: e.target.value,
        },
      }));
      return;
    }
    setSchoolData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="grid grid-cols-2 gap-x-10 pb-6 border-b mt-3">
      <div className="">
        <div className="my-3">
          <h1 className="font-[500]">Location</h1>
          {!isEditing ? (
            <p className="p-2"> {school.address.location}</p>
          ) : (
            <input
              value={schoolData.address.location}
              className="px-4 py-2 border-b border-slate-200 outline-none bg-gray-50 w-full"
              disabled={loading}
              onChange={handleChange}
              name="address.location"
            />
          )}
        </div>
        <div className="my-3">
          <h1 className="font-[500]">Street</h1>
          {!isEditing ? (
            <p className="p-2"> {school.address.street}</p>
          ) : (
            <input
              value={schoolData.address.street}
              className="px-4 py-2 border-b border-slate-200 outline-none bg-gray-50 w-full"
              onChange={handleChange}
              disabled={loading}
              name="address.street"
            />
          )}
        </div>
        <div className="my-3">
          <h1 className="font-[500]">Map Link</h1>
          {!isEditing ? (
            <p className="p-2"> {school.address.mapLink}</p>
          ) : (
            <input
              value={schoolData.address.mapLink}
              className="px-4 py-2 border-b border-slate-200 outline-none bg-gray-50 w-full"
              disabled={loading}
              onChange={handleChange}
              name="address.mapLink"
            />
          )}
        </div>
        <div className="my-3">
          <h1 className="font-[500]">Principal</h1>
          {!isEditing ? (
            <p className="p-2"> {school.principalName}</p>
          ) : (
            <input
              value={schoolData.principalName}
              name="principalName"
              disabled={loading}
              className="px-4 py-2 border-b border-slate-200 outline-none bg-gray-50 w-full"
              onChange={handleChange}
            />
          )}
        </div>

        <h1 className="font-[500]">Phone number</h1>
        {!isEditing ? (
          <p className="p-2"> {school.principalPhone}</p>
        ) : (
          <input
            value={schoolData.principalPhone}
            className="px-4 py-2 border-b border-slate-200 outline-none bg-gray-50 w-full"
            disabled={loading}
            onChange={handleChange}
            name="principalPhone"
          />
        )}
      </div>
      <div className="my-3">
        <h1 className="font-[500]">Description</h1>
        {!isEditing ? (
          <p className="p-2"> {school.description}</p>
        ) : (
          <textarea
            value={schoolData.description}
            className="px-4 py-2 border-b border-slate-200 outline-none bg-gray-50 w-full resize-none h-full"
            disabled={loading}
            onChange={handleChange}
            name="description"
          />
        )}
      </div>
      <div className="flex items-center gap-4 mt-3">
        {!isEditing ? (
          <button
            className="px-4 rounded-full w-fit flex items-center gap-2 py-3 bg-gray-100 "
            disabled={loading}
            onClick={() => setIsEditing(true)}
          >
            <img src="/icons/edit.svg" alt="" className="w-4 h-4" />
            Edit
          </button>
        ) : (
          <>
            <button
              className="px-4 rounded-full w-fit flex items-center gap-2 py-3 bg-brand text-white "
              disabled={loading}
              onClick={handleSaveChanges}
            >
              {loading ? "Please wait..." : "Save"}
            </button>
            <button
              className="px-4 rounded-full w-fit flex items-center gap-2 py-3 bg-gray-100 text-black "
              disabled={loading}
              onClick={() => {
                setIsEditing(false);
                setSchoolData(school);
              }}
            >
              Cancel
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default SchoolDetailsSection;
